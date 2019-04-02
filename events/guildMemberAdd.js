const { Event } = require('klasa');

const {
    getEmbed
} = require('../util/embed.js');

suffix = require('ordinal-number-suffix');

module.exports = class extends Event {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(member) {
        let config = member.guild.configs;

        if (config.milestone > 0 && config.milestoneChannel) {
            if (member.guild.memberCount % config.milestone === 0) {
                let embed = getEmbed('Milestone', '',
                    9529293, [{
                        "name": "Milestone Get!",
                        "value": `@${member.user.tag} is the **${suffix(member.guild.memberCount)}** member!`
                    }]);

                let channel = member.guild.channels.get(config.milestoneChannel);
                channel.send({
                    embed
                });
            }
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
