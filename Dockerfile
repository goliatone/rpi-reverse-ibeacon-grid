FROM        node:6.5
MAINTAINER  emiliano <emiliano@wework.com>

#Actually what we want to do is just make libic2 and git available
RUN \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Add dumb-init to solve docker's dangling pid 0
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 && \
    chmod +x /usr/local/bin/dumb-init && \
    apt-get update && apt-get install -y build-essential g++

#use changes to package.json to force Docker to not use
#cache. Use docker build --no-cache to force npm install.
ADD ./src/package.json /tmp/package.json

RUN cd /tmp && npm install --production
RUN cp -a /tmp/node_modules /usr/src/app/

COPY ./src/ /usr/src/app

# REPL_PORT
EXPOSE 8989

#If we use docker 1.12, we need to install curl
# HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
#     CMD curl -f http://localhost:3000/ping || exit 1

CMD ["dumb-init", "node", "index.js"]
