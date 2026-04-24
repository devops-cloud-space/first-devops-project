pipeline {
    agent any 
 
    environment {
        DOCKER_USERNAME = 'itsnotdocker'
        BACKEND_IMAGE = 'itsnotdocker/devops_practice_backend'
        FRONTEND_IMAGE = 'itsnotdocker/devops_practice_frontend'
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/devops-cloud-space/first-devops-project'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t %BACKEND_IMAGE%:%TAG% ./backend"
                bat "docker build -t %FRONTEND_IMAGE%:%TAG% ./frontend"

                bat "docker tag %BACKEND_IMAGE%:%TAG% %BACKEND_IMAGE%:latest"
                bat "docker tag %FRONTEND_IMAGE%:%TAG% %FRONTEND_IMAGE%:latest"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerpass', variable: 'DOCKERPASS')]) {
                    bat "echo %DOCKERPASS% | docker login -u %DOCKER_USERNAME% --password-stdin"
                }            
            }
        }

        stage('Push Docker Images') {
            steps {
                bat "docker push %BACKEND_IMAGE%:%TAG%"
                bat "docker push %FRONTEND_IMAGE%:%TAG%"
                bat "docker push %BACKEND_IMAGE%:latest"
                bat "docker push %FRONTEND_IMAGE%:latest"
            }
        }
    }

    post {
        always {
            bat "docker logout"
            bat "docker system prune -f"
        }
    }
}
