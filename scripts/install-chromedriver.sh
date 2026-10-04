#!/usr/bin/env bash
set -euo pipefail

chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
version="$("$chrome" --version | awk '{print $3}')"
destination='tools/chromedriver'
archive="$destination/chromedriver.zip"

mkdir -p "$destination"
curl --fail --location --silent --show-error \
  "https://storage.googleapis.com/chrome-for-testing-public/${version}/mac-arm64/chromedriver-mac-arm64.zip" \
  --output "$archive"
unzip -oq "$archive" -d "$destination"
mv "$destination/chromedriver-mac-arm64/chromedriver" "$destination/chromedriver"
rm "$archive"
chmod +x "$destination/chromedriver"
printf 'Installed Chromedriver %s at %s/chromedriver\n' "$version" "$destination"
