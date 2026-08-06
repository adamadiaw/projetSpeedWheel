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

        stage('Run Container') {
            steps {
                script {
                    // On lance un conteneur de test pour vérifier que ça démarre
                    sh 'podman run -d --name test-backend -p 8081:8080 speedwheel-backend:latest'
                    // On attend un peu que le conteneur démarre
                    sh 'sleep 10'
                }
            }
        }

        stage('Test API') {
            steps {
                script {
                    // On fait une requête HTTP vers l'API pour vérifier qu'elle répond
                    sh 'curl -f http://localhost:8081/api/vehicules || exit 1'
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