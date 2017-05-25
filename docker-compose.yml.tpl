version: '3'

services:
  server:
    build: .
    image: goliatone/rpi-reverse-ibeacon-grid
    hostname: picon-{{NODE_ENV}}
    command: dumb-init node index.js
    ports:
      - "{{NODE_REPL_PORT}}:{{NODE_REPL_PORT}}"
    environment:
      - DEBUG=rpi-reverse-ibeacon-grid
      - NODE_ENV={{NODE_ENV}}
      - NODE_APP_ID={{NODE_APP_ID}}
      - NODE_REPL_PORT={{NODE_REPL_PORT}}
      - NODE_REPL_ENABLED={{NODE_REPL_ENABLED}}
      - NODE_AMQP_EXCHANGE={{NODE_AMQP_EXCHANGE}}
      - NODE_AMQP_ENDPOINT={{NODE_AMQP_ENDPOINT}}
      - NODE_BEACON_UUID={{NODE_BEACON_UUID}}
      - NODE_BEACON_MAJOR={{NODE_BEACON_MAJOR}}
      - NODE_BEACON_MINOR={{NODE_BEACON_MINOR}}
    restart: always
    logging:
      options:
        max-size: "50m"
        max-file: "3"
