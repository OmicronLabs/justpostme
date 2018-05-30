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
      steps {
        archiveArtifacts 'frontend/justpostme/build/**/*.*, Dockerfile'
        sh '''ssh -l mhutti1 build.mhutti1.eu "mkdir test"'''
      }
    }
    stage('Cleanup') {
      steps {
        cleanWs(cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, cleanWhenAborted: true, deleteDirs: true)
      }
    }
  }
  environment {
    ci = 'true'
    npm_config_cache = 'npm-cache'
    NODE_PATH = 'src/'
  }
}
