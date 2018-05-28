pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops	300
--device-write-iops 50'''
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