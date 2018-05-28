pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops="/dev/sda:50"
--device-write-iops="/dev/sda:50"'''
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