pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'prathamvish333'
        IMAGE_FRONTEND = "${DOCKER_HUB_USER}/notes-frontend"
        IMAGE_BACKEND = "${DOCKER_HUB_USER}/notes-backend"
        // Use the branch name (dev, sit, prod) as the Docker tag
        TAG = "${env.BRANCH_NAME ?: 'dev'}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🚀 Starting Build for Branch: ${TAG}"
                checkout scm
            }
        }
        
        stage('Build & Push Images') {
            steps {
                script {
                    // This uses the 'docker-hub-creds' we created in Jenkins
                    docker.withRegistry('', 'docker-hub-creds') {
                        
                        echo "Building Frontend: ${IMAGE_FRONTEND}:${TAG}"
                        sh "docker build -t ${IMAGE_FRONTEND}:${TAG} ./frontend"
                        sh "docker push ${IMAGE_FRONTEND}:${TAG}"
                        
                        echo "Building Backend: ${IMAGE_BACKEND}:${TAG}"
                        sh "docker build -t ${IMAGE_BACKEND}:${TAG} ./backend"
                        sh "docker push ${IMAGE_BACKEND}:${TAG}"
                    }
                }
            }
        }
        
        stage('GitOps Sync (ArgoCD)') {
            steps {
                echo "Syncing manifests for environment: ${TAG}"
                // Logic to update K8s manifests will go here
                echo "Successfully triggered ArgoCD for ${TAG}!"
            }
        }
    }
    
    post {
        success {
            echo "✅ Successfully deployed ${TAG} version to the cloud!"
        }
        failure {
            echo "❌ Pipeline failed for ${TAG}. Check logs!"
        }
    }
}
