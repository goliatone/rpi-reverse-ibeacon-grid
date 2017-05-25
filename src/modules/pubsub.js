/*jshint esversion:6, node:true*/

'use strict';

const ascoltatori = require('ascoltatori-lowfat');

/*
 * We should subscribe to the events we are interested in,
 * but only for the buildings that we care. We should probably
 * only listen to partitions:
 * We Live - Wall Street
 * DC04 - Crystal City
 *
 * TODO: Build a pubsub service that has different
 *       engines: amqp, ws, etc.
 */
module.exports.init = function $amqpClient(context, config){
    let _logger = context.getLogger('pubsub');

    _logger.info('Loading pubsub module...');
    /*
     * If we want to publish events before
     * the service is ready, we do so using
     * a buffer.
     */
    const pubsub = {
        _buffer: [],
        _subscribers: [],
        publish: function(topic, data){
            pubsub._buffer.push({topic, data});
        },
        subscribe:function(topic, handler){
            pubsub._subscribers.push({topic, handler});
        },
        ready: function(amqp) {
            if(pubsub._buffer.length) {
                pubsub._buffer.map((obj) => amqp.publish(obj.topic, obj.data));
            }

            if(pubsub._subscribers){
                pubsub._subscribers.map((obj) => amqp.subscribe(obj.topic, obj.handler));
            }

            pubsub._buffer.length = 0;
            pubsub._subscribers.length = 0;
            //Remove the reference to the temp object.
        }
    };

    // context.provide('pubsub', pubsub);

    return new Promise(function(resolve, reject) {

        // context.provide('pubsub', pubsub);

        ascoltatori.build(config, function (err, ascoltatore) {
            if(err) {
                _logger.error(err.message);
                _logger.error(err.stack);
                return reject(err);
            }

            _logger.info('===> AMQP client CONNECTED');

            if(pubsub._buffer.length){
                pubsub._buffer.map((obj) => ascoltatore.publish(obj.topic, obj.data));
            }

            pubsub.ready(ascoltatore);

            /*
             * To know what is going on, check config/amqp.js:
             * channels: [
             *     {
             *           topic: 'Master/* /access-granted',
             *           contextEventType: 's2.update',
             *           clientEventType: 's2.access_granted',
             *           description: 'Access Granted on Master'
             *      }
             * ]
             */
            config.channels.map(function(channel){
                _logger.info('subscribe to channel ' + channel.topic);

                ascoltatore.subscribe(channel.topic, function(topic, message){
                    if(channel.debug){
                        _logger.info('------------------');
                        _logger.info('JANUS Channel Hanlder');
                        _logger.info('description: %s', channel.description);
                        _logger.info('channel topic: %s', channel.topic);
                        _logger.info('topic: %s', topic);
                        _logger.info('context.emit %s', channel.appEventType);
                        _logger.info('------------------');
                    }

                    context.emit(channel.appEventType, {
                        type: channel.clientEventType,
                        topic: topic,
                        payload: message
                    });
                });
            });
            resolve(pubsub);
        });
    });
    // return pubsub;
};
