const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 10,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<guild:guild> <startDate:string> <array:str>',
            usageDelim: ' ',
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [guild, startDate, array]) {
        array = array.split(',');
        startDate = new Date(startDate);
        array = array.map(count => {
            startDate.setDate(startDate.getDate() + 1);
            return {
                count: count,
                date: startDate.toJSON()
            };
        })
        await guild.configs.update('counts', array);
        return message.reply("Success");
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
