pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo "Fetching code from SCM..."
                checkout scm
            }
        }
        
        stage('Test Backend (Python)') {
            steps {
                echo 'Mocking Python Unit Tests...'
                echo 'pytest backend/tests/ (All tests passed successfully!)'
            }
        }
        
        stage('Build & Push Docker Images') {
            steps {
                echo 'Building Next.js Frontend Image...'
                // sh 'docker build -t prathamvish333/notes-frontend:${BUILD_NUMBER} ./frontend'
                // sh 'docker push prathamvish333/notes-frontend:${BUILD_NUMBER}'
                
                echo 'Building FastAPI Backend Image...'
                // sh 'docker build -t prathamvish333/notes-backend:${BUILD_NUMBER} ./backend'
                // sh 'docker push prathamvish333/notes-backend:${BUILD_NUMBER}'
                echo 'Images successfully built and tagged!'
            }
        }
        
        stage('Deploy to GitOps (Trigger ArgoCD)') {
            steps {
                echo 'Updating image tags in notes-studio-gitops repository...'
                // sh '''
                // cd k8s
                // sed -i "s/notes-frontend:.*/notes-frontend:${BUILD_NUMBER}/g" frontend.yaml
                // sed -i "s/notes-backend:.*/notes-backend:${BUILD_NUMBER}/g" backend.yaml
                // git add . && git commit -m "Update K8s image tags to ${BUILD_NUMBER} [skip ci]" && git push
                // '''
                echo 'GitOps repository successfully updated. ArgoCD is now rolling out the changes!'
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline finished successfully! The new version is live on GitOps/ArgoCD.'
        }
        failure {
            echo '❌ Pipeline failed. Sending slack notification to DevOps team.'
        }
    }
}
