@echo off
echo Déploiement de SpeedWheel...
podman-compose -f docker-compose.prod.yml up -d
echo SpeedWheel est en ligne sur http://localhost:8080/api/vehicules