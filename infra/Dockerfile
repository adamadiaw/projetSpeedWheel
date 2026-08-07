FROM docker.io/jenkins/jenkins:lts

USER root

# Installation des outils essentiels + podman (sans la config qui pose problème)
RUN apt-get update && \
    apt-get install -y git maven podman && \
    apt-get clean

# On s'assure que le dossier /run/podman existe et a les bonnes permissions
RUN mkdir -p /run/podman && chmod 777 /run/podman

USER jenkins