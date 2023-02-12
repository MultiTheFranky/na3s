FROM node:18-bullseye

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
    wget -qO- 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz' | tar zxf - -C /steamcmd \
    && \
    mkdir -p /mongodb \
    && \
    cd /mongodb \
    && \
    wget -qO- 'https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian10-4.4.6.tgz' | tar zxf - -C /mongodb \
    && \
    mv mongodb-linux-x86_64-debian10-4.4.6/* .  \
    && \
    rm -rf mongodb-linux-x86_64-debian10-4.4.6 \
    && \
    rm -rf /mongodb/mongodb-linux-x86_64-debian10-4.4.6.tgz \
    && \
    export PATH=$PATH:/mongodb/mongodb-linux-x86_64-debian10-4.4.6/bin \
    && \
    mkdir data \
    && \
    cd bin \
    && \
    ./mongod --dbpath ../data --fork --logpath ../data/mongod.log

# Default environment variables
#SERVER ENVS
ENV SERVER_PORT=8000

#WEB ENVS
ENV WEB_PORT=3000

# Expose web ports
EXPOSE ${WEB_PORT}/tcp

# Expose arma ports
EXPOSE 2302/udp
EXPOSE 2303/udp
EXPOSE 2304/udp
EXPOSE 2305/udp
EXPOSE 2306/udp

# Set steamcmd as a volume
VOLUME /steamcmd

# Set working directory
WORKDIR /na3s

# Copy all necessary files (TODO: copy only build files)
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY web ./web
COPY shared ./shared
COPY server ./server
COPY .yarn ./.yarn
COPY .env.example .env

STOPSIGNAL SIGINT

RUN yarn

ENTRYPOINT ["yarn","launch-prod"];
