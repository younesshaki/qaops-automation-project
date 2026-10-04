pipeline {
  agent any

  options { timestamps() }

  stages {
    stage('Install dependencies') {
      steps { sh 'npm ci && bash scripts/install-chromedriver.sh' }
    }
    stage('UI — Selenium') {
      steps { sh 'npm run test:ui && npm run report:ui' }
    }
    stage('API — Newman') {
      steps { sh 'npm run test:api' }
    }
  }

  post {
    always {
      archiveArtifacts allowEmptyArchive: true, artifacts: 'reports/**,allure-results/**'
    }
  }
}
