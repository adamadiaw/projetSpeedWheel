pipeline {
    agent any

    environment {
        DOCKER_HOST = "unix:///run/podman/podman.sock"
    }

    tools {
        maven 'Maven'
        jdk 'JDK21'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'podman build -t speedwheel-backend:latest backend/'
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                script {
                    sh 'podman save -o speedwheel-backend.tar speedwheel-backend:latest'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'podman-remote stop test-backend || true'
                    sh 'podman-remote rm test-backend || true'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Pipeline échoué. Vérifie les logs.'
        }
    }
}