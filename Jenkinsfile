pipeline {
    agent any

    environment {
        BRANCH_NAME = 'dev'
        GIT_URL = 'https://github.com/prathamvish333/Notes-Studio.git'
        
        // Docker configuration
        DOCKER_HUB_USER = "prathamvish333"
        FRONTEND_IMAGE  = "${DOCKER_HUB_USER}/notes-frontend"
        BACKEND_IMAGE   = "${DOCKER_HUB_USER}/notes-backend"
        DOCKER_CREDS_ID = "docker-hub-credentials"
    }

    stages {
        stage('1. Git Clone & Check CI') {
            steps {
                echo 'Cloning the dev branch...'
                git branch: "${BRANCH_NAME}", url: "${GIT_URL}"
                
                script {
                    def commitMsg = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    if (commitMsg.contains('[skip ci]')) {
                        env.SKIP_CI = 'true'
                        echo "Commit message contains [skip ci]. The rest of the pipeline will be skipped gracefully!"
                    } else {
                        env.SKIP_CI = 'false'
                    }
                }
            }
        }

        stage('CI/CD Pipeline') {
            when {
                expression { env.SKIP_CI != 'true' }
            }
            stages {
                stage('2. SonarQube Quality Check') {
                    steps {
                        echo 'Running SonarQube Analysis...'
                        withSonarQubeEnv('sonar') {
                            script {
                                def scannerHome = tool 'sonarscanner'
                                sh "${scannerHome}/bin/sonar-scanner " +
                                   "-Dsonar.projectKey=Notes-Studio-Dev " +
                                   "-Dsonar.projectName=Notes-Studio-Dev " +
                                   "-Dsonar.sources=."
                            }
                        }
                    }
                }

                stage('3. SonarQube Quality Gate') {
                    steps {
                        echo 'Waiting for SonarQube Quality Gate results...'
                        timeout(time: 5, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: false
                        }
                    }
                }

                stage('5. Trivy Filesystem Scan') {
                    steps {
                        echo 'Downloading and Running Trivy Vulnerability Scan...'
                        sh '''
                            # Download Trivy binary directly into this workspace
                            curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b .
                            
                            # Run the scan using the downloaded binary
                            ./trivy fs --format table \\
                                     --exit-code 0 \\
                                     --severity UNKNOWN,LOW,MEDIUM,HIGH \\
                                     . || true
                                     
                            ./trivy fs --format table \\
                                     --exit-code 0 \\
                                     --severity CRITICAL \\
                                     . || true
                        '''
                    }
                }

                stage('6. Build Docker Images') {
                    steps {
                        echo 'Building Next.js Frontend Image...'
                        sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
                        
                        echo 'Building FastAPI Backend Image...'
                        sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
                    }
                }

                stage('7. Push to Docker Hub') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: DOCKER_CREDS_ID, passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                            sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                            
                            echo 'Pushing Frontend Image...'
                            sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                            
                            echo 'Pushing Backend Image...'
                            sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        }
                    }
                }
                
                stage('8. Update Git Manifests (GitOps)') {
                    steps {
                        echo 'Updating K8s YAML files with new image tags and pushing to Git...'
                        withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                            sh """
                            # Configure git identity
                            git config --global user.email "jenkins@prathamvishwakarma.com"
                            git config --global user.name "Jenkins CI"
                            
                            cd k8s
                            
                            # Replace the image tag in the yaml files
                            sed -i "s|image: ${FRONTEND_IMAGE}:.*|image: ${FRONTEND_IMAGE}:${BUILD_NUMBER}|g" frontend.yaml
                            sed -i "s|image: ${BACKEND_IMAGE}:.*|image: ${BACKEND_IMAGE}:${BUILD_NUMBER}|g" backend.yaml
                            
                            # Commit and push changes
                            git add frontend.yaml backend.yaml
                            git commit -m "Update image tags to build \${BUILD_NUMBER} [skip ci]"
                            
                            # Push back to the dev branch using the token
                            git push https://prathamvish333:\${GITHUB_TOKEN}@github.com/prathamvish333/Notes-Studio.git HEAD:dev
                            """
                        }
                        echo 'Successfully updated Git! ArgoCD will sync the changes shortly.'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Cleaning up workspace...'
            deleteDir()
        }
        success {
            script {
                if (env.SKIP_CI == 'true') {
                    echo 'Pipeline gracefully skipped due to [skip ci]'
                } else {
                    echo 'Dev Pipeline Completed Successfully!'
                }
            }
        }
        failure {
            echo 'Dev Pipeline Failed. Check the logs above.'
        }
    }
}
