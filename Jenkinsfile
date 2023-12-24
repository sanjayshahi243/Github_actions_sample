pipeline {
    agent any
    
    environment {
        TAG_NUMBER = ""
    }

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
                    def tagNumber = commitMessage =~ /Deploy: (\S+):/
                    if (tagNumber) {
                        tagNumber = tagNumber[0][1]
                        TAG_NUMBER = tagNumber
                        echo "Found deploy keyword with tag number: ${TAG_NUMBER}"
                    } else {
                        error "No deploy keyword found in commit message. Aborting the build."
                    }
                }
            }
        }

        stage('Checkout and Create Tag') {
            steps {
                script {
                    // Get the latest commit message
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()

                    // Extract tag number from the commit message
                    def tagNumber = commitMessage =~ /Deploy: (\S+):/
                    if (tagNumber) {
                        tagNumber = tagNumber[0][1]
                        TAG_NUMBER = tagNumber
                        echo "Found deploy keyword with tag number: ${TAG_NUMBER}"

                        // Check if the tag already exists
                        def tagExists = sh(script: "git tag -l ${TAG_NUMBER}", returnStatus: true) == 0

                        if (tagExists) {
                            echo "Tag ${TAG_NUMBER} already exists. Skipping the tag creation."
                        } else {
                            // Create a new tag
                            sh "git tag ${TAG_NUMBER}"
                            sh 'git push --set-upstream origin ${TAG_NUMBER}'
                            echo "Tag ${TAG_NUMBER} created and pushed."
                        }
                    } else {
                        error "No deploy keyword found in commit message. Aborting the build."
                    }
                }
            }
        }
    }
}
