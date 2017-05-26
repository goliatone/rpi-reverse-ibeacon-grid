'use strict';


function RunPostCommand(event) {
    let context = event.context;
    let _logger = context.getLogger('run-post-cmd');
    _logger.warn('Post command...');

    context.onceRegistered('pubsub', () => {
        _logger.warn('pubsub active, active')
        context.pubsub.publish('ww/ble-grid/active', {
            id: context.name
        });
    });
}

module.exports = RunPostCommand;
module.exports.execute = RunPostCommand;
