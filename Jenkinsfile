pipeline {
    agent any

    environment {
        BRANCH_NAME = 'dev'
        GIT_URL = 'https://github.com/prathamvish333/Notes-Studio.git'
    }

    stages {
        stage('1. Git Clone') {
            steps {
                echo 'Cloning the dev branch...'
                git branch: "${BRANCH_NAME}", url: "${GIT_URL}"
            }
        }

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
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('4. OWASP Dependency Check') {
            steps {
                echo 'Running OWASP Dependency Check with NVD API Key...'
                dependencyCheck additionalArguments: '--format HTML --format XML --scan . --nvdApiKey 5fc2eea0-5f93-4589-9551-acb31f506eca', odcInstallation: 'DC'
                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }

        stage('5. Trivy Filesystem Scan') {
            steps {
                echo 'Downloading and Running Trivy Vulnerability Scan...'
                sh '''
                    # Download Trivy binary directly into this workspace
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b .
                    
                    # Run the scan using the downloaded binary
                    ./trivy fs --format table \
                             --exit-code 0 \
                             --severity UNKNOWN,LOW,MEDIUM,HIGH \
                             .
                             
                    ./trivy fs --format table \
                             --exit-code 0 \
                             --severity CRITICAL \
                             .
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished. Cleaning up workspace...'
            // Using Jenkins built-in deleteDir instead of the plugin
            deleteDir()
        }
        success {
            echo 'Dev Pipeline Completed Successfully!'
        }
        failure {
            echo 'Dev Pipeline Failed. Check the logs above.'
        }
    }
}
