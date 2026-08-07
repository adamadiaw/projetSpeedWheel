FROM docker.io/jenkins/jenkins:lts

USER root

# Installation de Git et Maven (Podman est retiré)
RUN apt-get update && \
    apt-get install -y git maven && \
    apt-get clean

USER jenkins