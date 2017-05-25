'use strict';

const BLE = require('bleacon');
const extend = require('gextend');

const DEFAULTS = {
    beacon: {
        uuid: null,
        major: null,
        minor: null,
    },
    metadata: {
        name: null,
    }
};

let _readings = {};

module.exports.init = function(context, config) {
    let _logger = context.getLogger('ble-scanner');

    config = extend({}, DEFAULTS, config);
    let metadata = config.metadata;

    return new Promise((resolve, reject)=> {
        _logger.info('We are here...');

        context.resolve('pubsub').then((pubsub)=> {
            BLE.on('discover', (beacon) => {
                let topic = `ww/ble-grid/${beacon.uuid}/${beacon.major}/${beacon.minor}`;

                if(shouldSkip(topic, beacon)) {
                    return;
                }

                _logger.info(topic, beacon.rssi);

                pubsub.publish(topic, {
                    topic,
                    metadata,
                    beacon
                });
            });

            /*
             * If beacon definition is undefined then
             * we filter based up to whats defined:
             * uuid
             * uuid + major
             * uuid + major + minor
             */
            const data = parseBeaconData(config.beacon);

            _logger.info('scanner setting up BLE reader for: %s:%s:%s', data.uuid, data.major, data.minor);

            BLE.startScanning(data.uuid, data.major, data.minor);
        });
    });
};

function shouldSkip(topic, beacon) {
    let previous = _readings[topic];

    if(!previous) {
        _readings[topic] = beacon;
        return;
    }

    return previous.rssi === beacon.rssi;
}

function formatUUID(uuid='') {
    return uuid.toLowerCase().replace(/-/g, '');
}

function parseBeaconData(beacon={}) {

    let out = {};
    out.uuid = formatUUID(beacon.uuid);
    out.major = parseInt(beacon.major);
    out.minor = parseInt(beacon.minor);
    return out;
}
