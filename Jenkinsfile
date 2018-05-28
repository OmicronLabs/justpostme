pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''cd frontend/justpostme/
npm install'''
      }
    }
  }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
  }
}