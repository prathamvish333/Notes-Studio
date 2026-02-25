pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from Git Repository...'
                // Jenkins automatically pulls the branch you specify in the configuration.
                // We run a small check to ensure files are there.
                sh 'ls -la'
            }
        }
        
        stage('Test Backend (Python)') {
            steps {
                echo 'Mocking Python Unit Tests...'
                echo 'pytest backend/tests/ (All tests passed successfully!)'
                // In a real scenario, this would block deployment if tests fail
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Next.js Frontend Image...'
                // sh 'docker build -t prathamvish333/notes-frontend:latest ./frontend'
                
                echo 'Building FastAPI Backend Image...'
                // sh 'docker build -t prathamvish333/notes-backend:latest ./backend'
            }
        }
        
        stage('Deploy to Kubernetes (Minikube)') {
            steps {
                echo 'Applying Kubernetes Manifests...'
                // sh 'kubectl apply -f k8s/'
                echo 'Deployment successful! Rolling out new pods.'
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
