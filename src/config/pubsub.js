'use strict';

module.exports = {
    url: process.env.NODE_MQTT_ENDPOINT || 'mqtt://localhost:1883',
    clientid: 'hotdesk-service',
    connectionNeeded: true,
    onconnect: {
        topic: 'ww/ble-grid/location-node/up'
    },
    transport: {
        will: {
            topic: 'ww/ble-grid/location-node/down'
        }
    }
    // type: 'amqp',
    // json: true,
    // exchange: process.env.NODE_AMQP_EXCHANGE || ('wework.' + process.env.NODE_ENV),
    // client: {
    //     url: process.env.NODE_AMQP_ENDPOINT
    // },
    // channels: []
};
