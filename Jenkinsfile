pipeline {
  agent any   // This means Jenkins can run the pipeline on any available agent (machine)

  stages {
    stage('Build Docker Images') {
      steps {
        // Build all services defined in docker-compose.yml
        sh 'docker-compose build'
      }
    }

    stage('Login to Docker Hub') {
      steps {
        // Use Jenkins stored credentials (ID = dockerhub-creds)
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                          usernameVariable: 'USER',
                                          passwordVariable: 'PASS')]) {
          // Log in to Docker Hub using those credentials
          sh 'echo $PASS | docker login -u $USER --password-stdin'
        }
      }
    }

    stage('Tag Images') {
      steps {
        // Tag the images with your Docker Hub username
        sh 'docker tag frontend:latest your-dockerhub-username/frontend:latest'
        sh 'docker tag backend:latest your-dockerhub-username/backend:latest'
      }
    }

    stage('Push Images') {
      steps {
        // Push the tagged images to Docker Hub
        sh 'docker push your-dockerhub-username/frontend:latest'
        sh 'docker push your-dockerhub-username/backend:latest'
      }
    }
  }
}
