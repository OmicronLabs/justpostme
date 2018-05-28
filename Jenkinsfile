pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops="/dev/sda:100"
--device-write-iops="/dev/sda:100"'''
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''cd frontend/justpostme/
npm install --verbose'''
      }
    }
  }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
  }
}