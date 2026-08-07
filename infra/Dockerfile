FROM docker.io/jenkins/jenkins:lts

USER root

# Installation de Git, Maven et podman-remote
RUN apt-get update && \
    apt-get install -y git maven podman-remote jq && \
    apt-get clean

USER jenkins