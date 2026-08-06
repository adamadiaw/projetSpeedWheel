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
                    // On utilise --network=host pour éviter les problèmes de /dev/net/tun
                    sh 'podman run -d --name test-backend --replace --network=host speedwheel-backend:latest'
                    sh 'sleep 10'
                }
            }
        }

        stage('Test API') {
            steps {
                script {
                    // On teste directement sur le port 8080 du conteneur Jenkins
                    sh 'curl -f http://localhost:8080/api/vehicules || exit 1'
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