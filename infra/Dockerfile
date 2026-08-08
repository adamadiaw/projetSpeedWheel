FROM docker.io/jenkins/jenkins:lts

USER root

# Installation des outils essentiels + podman
RUN apt-get update && \
    apt-get install -y git maven podman && \
    apt-get clean

# Création du lien symbolique docker -> podman (solution permanente)
RUN ln -s /usr/bin/podman /usr/bin/docker

# Création du dossier du socket avec les bons droits
RUN mkdir -p /run/podman && chmod 777 /run/podman

USER jenkins