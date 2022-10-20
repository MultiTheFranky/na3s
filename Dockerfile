FROM node:bullseye

LABEL maintainer="multithefranky - github.com/multithefranky"
LABEL org.opencontainers.image.source=https://github.com/multithefranky/na3s

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

# Default environment variables
ENV ARMA_BINARY=./arma3server
ENV ARMA_CONFIG=main.cfg
ENV ARMA_PARAMS=
ENV ARMA_PROFILE=main
ENV ARMA_WORLD=empty
ENV ARMA_LIMITFPS=1000
ENV ARMA_CDLC=
ENV HEADLESS_CLIENTS=0
ENV HEADLESS_CLIENTS_PROFILE="\$profile-hc-\$i"
ENV PORT=2302
ENV STEAM_BRANCH=public
ENV STEAM_BRANCH_PASSWORD=
ENV MODS_LOCAL=true
ENV MODS_PRESET=
ENV SKIP_INSTALL=false

# Expose arma 3 server ports
EXPOSE 2302/udp
EXPOSE 2303/udp
EXPOSE 2304/udp
EXPOSE 2305/udp
EXPOSE 2306/udp

# Expose web ports
EXPOSE 3000/tcp

# Set steamcmd as a volume
VOLUME /steamcmd

# Set working directory
WORKDIR /na3s

# Copy all necessary files
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY web ./web
COPY shared ./shared
COPY server .server
COPY .yarn ./.yarn

STOPSIGNAL SIGINT

RUN ["yarn"]

CMD ["yarn","install-launch"];