pipeline {
    agent any

    tools {
        maven 'Maven'    // On utilisera Maven qu'on va configurer dans Jenkins
        jdk 'JDK21'      // On utilisera JDK 21
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
                    // On compile ET on crée le fichier .jar final (sans les tests)
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // On construit l'image Docker en utilisant le Dockerfile du backend
                    sh 'podman build -t speedwheel-backend:latest backend/'
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                script {
                    // Sauvegarder l'image dans un fichier .tar
                    sh 'podman save -o speedwheel-backend.tar speedwheel-backend:latest'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // On arrête et supprime le conteneur de test
                    sh 'podman stop test-backend || true'
                    sh 'podman rm test-backend || true'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Pipeline échoué. Vérifie les logs.'
        }
    }
}