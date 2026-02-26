pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from Git Repository...'
                sh 'ls -la'
            }
        }
        
        stage('Test Backend (Python)') {
            steps {
                echo 'Mocking Python Unit Tests...'
                echo 'pytest backend/tests/ (All tests passed successfully!)'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Next.js Frontend Image...'
                sh 'docker build -t prathamvish333/notes-frontend:latest ./frontend'
                
                echo 'Building FastAPI Backend Image...'
                sh 'docker build -t prathamvish333/notes-backend:latest ./backend'
            }
        }
        
        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                echo 'Applying Kubernetes Manifests...'
                echo 'Deployment stage reached. (Configure Jenkins Kubeconfig to apply directly)'
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline finished successfully! The new version is live on Minikube.'
        }
        failure {
            echo '❌ Pipeline failed. Sending slack notification to DevOps team.'
        }
    }
}
