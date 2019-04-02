const {
    Task
} = require('klasa');

const {
    getEmbed
} = require('../util/embed.js');

module.exports = class extends Task {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true
        });
    }

    async run(data) {
        let errors = [];
        console.log('Updating member counts');
        this.client.guilds.forEach((server, i) => {
            server.configs.update('counts', {
                'count': server.memberCount,
                'date': new Date()
            }, {
                action: 'add'
            }).then(console.log);

            if (server.configs.logChannel) {

                let embed = getEmbed('', '', 6802791, [{
                    "name": 'Member Log',
                    "value": `${server.memberCount}`
                }]);
                try {
                    server.channels.get(server.configs.logChannel).send({
                        embed
                    });
                } catch (ex) {
                    errors.push(ex.message);
                }
            }
        });
        console.log(`${errors.length} errors`);
    }

    async init() {
    }
};