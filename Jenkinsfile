pipeline {
  agent {
    docker {
      image 'node'
      args '''--device-read-iops="/dev/sda:250"
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
        sh '''cd frontend/justpostme
yarn run build'''
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        archiveArtifacts 'frontend/justpostme/build/**/*.*, backend/server.js, frontend/Dockerfile, backend/Dockerfile, frontend/justpostme/server.js'
      }
    }
    stage('Cleanup') {
      steps {
        cleanWs(cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, cleanWhenAborted: true, deleteDirs: true)
      }
    }
  }
  
 post {
        always {
            sh '''/home/mhutti1/deploy-backend.bash'''
        }
        failure {
            mail to: mhutti1@gmail.com subject: 'The Pipeline failed :('
        }
    }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
    NODE_PATH = 'src/'
  }
}
