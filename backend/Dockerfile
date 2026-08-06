# Étape 1 : Build de l'application avec Maven
FROM docker.io/maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -Djava.security.egd=file:/dev/./urandom
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : Exécution de l'application avec une image Java légère
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]