'use strict';

module.exports = {
    beacon: {
        uuid: process.env.NODE_BEACON_UUID,
        major: process.env.NODE_BEACON_MAJOR,
        minor: process.env.NODE_BEACON_MINOR
    },
    metadata: {
        name: process.env.NODE_APP_ID,
    }
};
