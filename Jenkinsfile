pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Check for Deploy Keyword') {
            steps {
                script {
                    // Get the latest commit message
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()

                    // Extract tag number from the commit message
                    def tagNumber = commitMessage =~ /deploy: (\d+)/

                    if (tagNumber) {
                        tagNumber = tagNumber[0][1]
                        echo "Found deploy keyword with tag number: ${tagNumber}"
                    } else {
                        error "No deploy keyword found in commit message. Aborting the build."
                    }
                }
            }
        }

        stage('Check Tag Existence') {
            steps {
                script {
                    // Check if the tag already exists
                    def tagExists = sh(script: "git tag -l ${tagNumber}", returnStatus: true) == 0

                    if (tagExists) {
                        error "Tag ${tagNumber} already exists. Aborting the build."
                    } else {
                        echo "Tag ${tagNumber} does not exist. Proceeding with the build."
                    }
                }
            }
        }

        stage('Build and Test') {
            steps {
                // Add your build and test steps here
                // For example: sh 'npm install && npm test'
            }
        }

        stage('Create Tag') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    // Create a new tag
                    sh "git tag ${tagNumber}"
                    sh 'git push origin ${tagNumber}'
                }
            }
        }
    }
}
