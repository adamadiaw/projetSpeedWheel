# Étape 1 : Compilation du projet Java avec Maven
FROM docker.io/maven:3.9.9-eclipse-temurin-21 AS backend-build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# Étape 2 : Image finale légère (exécution)
FROM docker.io/eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=backend-build /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]