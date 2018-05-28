pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops="/dev/sda:100"
--device-write-iops="/dev/sda:100"'''
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