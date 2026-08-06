# Utilise uniquement une image d'exécution Java légère
FROM docker.io/eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copie directement le fichier .jar déjà généré par Jenkins
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]