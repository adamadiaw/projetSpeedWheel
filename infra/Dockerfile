FROM docker.io/jenkins/jenkins:lts

USER root

# Installation de Podman, Git et Maven
RUN apt-get update && \
    apt-get install -y podman git maven && \
    apt-get clean

# Configuration de Podman pour utiliser vfs (plus fiable en conteneur)
RUN mkdir -p /etc/containers && \
    echo -e "[storage]\ndriver = \"vfs\"" > /etc/containers/storage.conf && \
    echo -e "[registries.search]\nregistries = ['docker.io']" > /etc/containers/registries.conf

USER jenkins