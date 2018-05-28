pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops="/dev/sda1:250"
--device-write-iops="/dev/sda1:100"'''
    }

  }
  stages {
    stage('Install') {
      steps {
        sh '''cd frontend/justpostme/
yarn install'''
      }
    }
    stage('Build') {
      steps {
        sh 'yarn run build'
      }
    }
  }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
  }
}