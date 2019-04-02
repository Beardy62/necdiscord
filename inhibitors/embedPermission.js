const { Inhibitor } = require('klasa');

const {
    checkPerms
} = require('../util/embed.js');

module.exports = class extends Inhibitor {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            spamProtection: false
        });
    }

    async run(msg, cmd) {
        let embedRequired = ['ping', 'stats', 'help', 'members', 'graph', 'ggraph', 'predict', 'invite', 'config'];
        if (embedRequired.includes(cmd.name) && !checkPerms(msg.channel, this.client)) {
            return msg.channel.send("<a:error:398684450973810689> I need the `Embed Links` permission to work.");
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
