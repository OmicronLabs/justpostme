pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    ci = 'true'
  }
}