const { Command } = require('klasa');
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
            description: 'Lists available commands',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        let fields = [];
        let prefix = '^';
        if (message.channel.type === 'text') {
            prefix = message.guild.configs.prefix;
            let fields = [{
                name: "Prefix",
                value: `**${message.guild.name}:** \`${prefix}\``
            }];
        }

        // Load all commands

        this.client.commands.forEach(command => {
            if (command.permissionLevel > 7 || typeof command.description !== 'string') return;
            let permString = {
                '6': 'Server Manager',
                '7': 'Server Owner'
            }[command.permissionLevel];
            let newField = {
                name: `\`${prefix}${command.name}\``,
                value: (permString ? `*[${permString}]* ` : '') + (command.description.length > 0 ? command.description : 'No description')
            };
            fields.push(newField);
        });

        let embed = getEmbed('Help',
            "This is Growth Tracker, a bot that can help you view how your server grows over time.\n[Invite me to your server](https://discordapp.com/api/oauth2/authorize?client_id=398265206658170880&permissions=52288&scope=bot) | [Vote for me on DBL](https://discordbots.org/bot/398265206658170880/vote)",
            9529293,
            fields
        );
        if (message.channel.type === 'text') {
            message.author.send({
                    embed
                })
                .then(() => {
                    message.channel.send('📥 **DM Sent**');
                }).catch(() => {
                    message.channel.send({
                        embed
                    });
                })
        } else {
            message.channel.send({
                embed
            });
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
