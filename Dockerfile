FROM node:bullseye

LABEL maintainer="multithefranky - github.com/multithefranky"

# Install arma 3 dependencies and steamcmd
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get update \
    && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        python3 \
        lib32stdc++6 \
        lib32gcc-s1 \
        libcurl4 \
        wget \
        ca-certificates \
    && \
    apt-get remove --purge -y \
    && \
    apt-get clean autoclean \
    && \
    apt-get autoremove -y \
    && \
    rm -rf /var/lib/apt/lists/* \
    && \
    mkdir -p /steamcmd \
    && \
    wget -qO- 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz' | tar zxf - -C /steamcmd

# Install mongodb
RUN echo "deb http://repo.mongodb.org/apt/debian bullseye/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list \
    && \
    wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add - \
    && \
    apt-get update \
    && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        mongodb-org \
    && \
    apt-get remove --purge -y \
    && \
    apt-get clean autoclean \
    && \
    apt-get autoremove -y \
    && \
    rm -rf /var/lib/apt/lists/* \
    && \
    sudo systemctl enable --now mongod \
    && \
    sudo systemctl status mongod

# Default environment variables
#SERVER ENVS
ENV SERVER_PORT=8000

#WEB ENVS
ENV WEB_PORT=3000

# Expose web ports
EXPOSE ${WEB_PORT}/tcp

# Set steamcmd as a volume
VOLUME /steamcmd

# Set mongodb as a volume
VOLUME /data/db

# Set working directory
WORKDIR /na3s

# Copy all necessary files
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY web ./web
COPY shared ./shared
COPY server ./server
COPY .yarn ./.yarn
COPY .env.example .env

STOPSIGNAL SIGINT

RUN ["yarn"]

CMD ["yarn","launch-prod"];