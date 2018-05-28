pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('error') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
  }
}