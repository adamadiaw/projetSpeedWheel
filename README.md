# SpeedWheel

Plateforme de vente, location, import/export de véhicules.

## Stack Technique

- **Backend** : Spring Boot 4.1 (Java 21, PostgreSQL, Redis, WebSocket, JWT)
- **Frontend** : Angular 17+ (standalone components, PWA, mode sombre, responsive)
- **Infrastructure** : Podman, Jenkins, Kubernetes (Minikube), Docker Hub

## Structure :

1. backend/ # API REST (Spring Boot)
2. frontend/ # Application web (Angular)

## Installation (Local)

1. Clone le repo : `git clone https://github.com/adamadiaw/projetSpeedWheel.git`
2. Lance l'infrastructure : `podman-compose up -d --build`

## SwaggerUI link :
- http://localhost:8080/swagger-ui/index.html#/

## Déploiement (Kubernetes)

1. Build et push les images sur Docker Hub via Jenkins.
2. Applique les manifestes : `kubectl apply -f k8s/`
3. Configure les port-forwards : `./redeploy.sh`

## Fonctionnalités

- Vente, location, import, export de véhicules
- Authentification JWT avec rôles
- Notifications WebSocket en temps réel
- Cache Redis
- PWA (installation + mode offline)

## Tests

- Backend : `cd backend && mvn test`
- Frontend : `cd frontend && npm test`

<div align="right"><code>Adama Diaw</code></div>
