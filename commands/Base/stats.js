const {
    Command
} = require('klasa');

const util = require('../../util/util.js');

const os = require('os');

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
            permissionLevel: 0,
            description: 'Displays statistics about the bot',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        let embed = getEmbed('Stats', '',
            9529293, [{
                "name": "Message Latency",
                "value": `${Math.floor(new Date().getTime() - message.createdTimestamp)} ms`,
                "inline": true
            }, {
                "name": "Client Latency",
                "value": `${Math.floor(this.client.ping)} ms`,
                "inline": true
            }, {
                "name": "Bot Uptime",
                "value": `${util.formatTime(process.uptime())}`,
                "inline": true
            }, {
                "name": "CPU Usage",
                "value": `${Math.floor(os.loadavg()[1]*1000)/10}%`,
                "inline": true
            }, {
                "name": "Memory Usage",
                "value": `${util.formatRAM(process.memoryUsage().heapUsed)}`,
                "inline": true
            }, {
                "name": "Total Servers",
                "value": `${this.client.guilds.size}`,
                "inline": true
            }, {
                "name": "Total Users",
                "value": `${this.client.guilds.map(g => g.memberCount).reduce((a, b) => a + b)}`,
                "inline": true
            }]
        );
        message.channel.send({
            embed
        });
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};