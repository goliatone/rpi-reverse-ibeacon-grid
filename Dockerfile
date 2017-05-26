FROM        hypriot/rpi-node:6.10
MAINTAINER  goliatone <hello@goliatone.com>

#Actually what we want to do is just make libic2 and git available
RUN \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Add dumb-init to solve docker's dangling pid 0
RUN apt-get update && \
    apt-get install -y build-essential bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin && \
    #This is to get around having to run bleno as sudo
    setcap cap_net_raw+eip $(eval readlink -f `which node`)

#use changes to package.json to force Docker to not use
#cache. Use docker build --no-cache to force npm install.
ADD ./src/package.json /tmp/package.json

RUN cd /tmp && npm install --production
RUN cp -a /tmp/node_modules /usr/src/app/

COPY ./src/ /usr/src/app

# REPL_PORT
EXPOSE 8988

CMD ["node", "index.js"]
