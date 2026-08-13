pipeline {
    agent any

    environment {
        // Nettoyage de DOCKER_HOST car géré par le volume du conteneur
        IMAGE_NAME = "adamadiaw/speedwheel-backend:latest" 
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
                    // Nettoyer les caches locaux du conteneur si nécessaire
                    sh 'rm -rf /run/containers/storage /run/libpod || true'
                    
                    // CORRECTION : On se place dans le dossier 'backend' pour lancer le build
                    dir('backend') {
                        sh "podman build -t ${IMAGE_NAME} ."
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "docker-hub-credentials", url: ""]) {
                        sh "podman push ${IMAGE_NAME}"
                    }
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
