const assert = require('node:assert/strict');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = 'https://formy-project.herokuapp.com';

async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless=new', '--window-size=1440,1000', '--no-sandbox', '--disable-dev-shm-usage');
  const builder = new Builder().forBrowser('chrome').setChromeOptions(options);
  if (process.env.CHROMEDRIVER_PATH) {
    builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH));
  }
  return builder.build();
}

async function visible(driver, locator) {
  const element = await driver.wait(until.elementLocated(locator), 15_000);
  await driver.wait(until.elementIsVisible(element), 15_000);
  return element;
}

describe('Formy Project — Selenium UI regression suite', function () {
  this.timeout(60_000);
  let driver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it('QA-UI-01: completes the registration form using controlled test data', async () => {
    await driver.get(`${BASE_URL}/form`);
    await (await visible(driver, By.id('first-name'))).sendKeys('QAOps');
    await driver.findElement(By.id('last-name')).sendKeys('Student');
    await driver.findElement(By.id('job-title')).sendKeys('Quality Engineer');
    await driver.findElement(By.id('radio-button-2')).click();
    await driver.findElement(By.id('checkbox-1')).click();
    const select = await driver.findElement(By.id('select-menu'));
    await select.findElement(By.css('option[value="2"]')).click();
    await driver.findElement(By.css('a[href="/thanks"]')).click();
    await driver.wait(until.urlContains('/thanks'), 10_000);
    assert.match(await driver.getPageSource(), /Thanks/i);
  });

  it('QA-UI-02: selects a radio button', async () => {
    await driver.get(`${BASE_URL}/radiobutton`);
    const second = await visible(driver, By.css('input[name="exampleRadios"][value="option2"]'));
    await second.click();
    assert.equal(await second.isSelected(), true);
  });

  it('QA-UI-03: opens the dropdown and exposes the Autocomplete option', async () => {
    await driver.get(`${BASE_URL}/dropdown`);
    await (await visible(driver, By.id('dropdownMenuButton'))).click();
    const option = await visible(driver, By.id('autocomplete'));
    assert.equal(await option.getAttribute('href'), `${BASE_URL}/autocomplete`);
    assert.match(await option.getText(), /Autocomplete/i);
  });

  it('QA-UI-04: opens and closes a modal popup', async () => {
    await driver.get(`${BASE_URL}/modal`);
    await (await visible(driver, By.id('modal-button'))).click();
    const modal = await visible(driver, By.id('exampleModal'));
    assert.equal(await modal.isDisplayed(), true);
    await driver.findElement(By.id('close-button')).click();
  });

  it('QA-UI-05: handles a JavaScript alert and a newly opened browser tab', async () => {
    await driver.get(`${BASE_URL}/switch-window`);
    const original = await driver.getWindowHandle();
    await (await visible(driver, By.id('alert-button'))).click();
    const alert = await driver.wait(until.alertIsPresent(), 10_000);
    assert.match(await alert.getText(), /This is a test alert/i);
    await alert.accept();
    await driver.findElement(By.id('new-tab-button')).click();
    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10_000);
    const handles = await driver.getAllWindowHandles();
    const newHandle = handles.find((handle) => handle !== original);
    await driver.switchTo().window(newHandle);
    assert.match(await driver.getTitle(), /Formy/i);
  });
});
