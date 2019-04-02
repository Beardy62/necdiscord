const {
    Command
} = require('klasa');

const drawGraph = require('../../util/Graph.js');

const {
    getEmbed
} = require('../../util/embed.js');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
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
            permissionLevel: 0,
            description: 'Displays a graph of growth per day',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        let conf = message.guild.configs.counts;
        let counts = conf.map(c => c.count);

        let diffs = counts.concat(message.guild.memberCount)
            .map((element, index, array) => array[index + 1] - element)
            .slice(0, counts.length);

        let dates = conf.map(c => new Date(c.date));
        message.channel.startTyping();

        drawGraph(diffs, dates.concat(new Date()), 'Growth Per Day: ' + message.guild.name)
            .then((buffer) => {
                message.channel.stopTyping();
                let embed = getEmbed('Graph', '', 6996519, []);
                let attachment = new MessageAttachment(buffer, 'graph.png');
                embed.image = {
                    url: 'attachment://graph.png'
                };
                message.channel.send({
                    embed: embed,
                    files: [
                        attachment
                    ]
                });
            });
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
