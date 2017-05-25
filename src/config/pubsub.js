'use strict';

module.exports = {
    type: 'amqp',
    json: true,
    exchange: process.env.NODE_AMQP_EXCHANGE || ('wework.' + process.env.NODE_ENV),
    client: {
        url: process.env.NODE_AMQP_ENDPOINT
    },
    channels: [
        // {
        //     topic: '*',
        //     appEventType: 'janus.update',
        //     clientEventType: 'janus.event',
        //     description: 'Catch All Topic',
        //     debug: false
        // },
        // {
        //     topic: 'janus/*/presence',
        //     appEventType: 'persistence.presence',
        //     clientEventType: 'persistence.presence',
        //     description: 'Emitted when Presence events',
        //     debug: false
        // },
        // {
        //     topic: 'janus/*/access/*',
        //     appEventType: 'persistence.activitylog.access',
        //     clientEventType: 'persistence.activitylog',
        //     description: 'Emitted by Activity events',
        //     debug: false
        // },
        // {
        //     topic: 'janus/*/door/*',
        //     appEventType: 'persistence.activitylog.door',
        //     clientEventType: 'persistence.activitylog.door',
        //     description: 'Emitted by Door events',
        //     debug: false
        // },
        // {
        //     topic: 'janus/credential/update',
        //     appEventType: 'janus.credential_update',
        //     clientEventType: 'janus.credential_update',
        //     description: 'Updated credential',
        //     debug: false
        // }
    ]
};
