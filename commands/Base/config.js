const {
    Command
} = require('klasa');

const {
    getErrorEmbed,
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
            permissionLevel: 6,
            description: 'Edits per-server configuration',
            extendedHelp: 'No extended help available.',
            usage: '[key:string] [value:string]',
            usageDelim: ' ',
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [key, value]) {
        let config = message.guild.configs;
        let prefix = config.prefix;
        console.log(config);
        let embed = null;
        if (!key && !value) {
            embed = getEmbed('Config', '', 6802791, [{
                    "name": "`Configuration:`",
                    "value": `**List:** ${prefix}config\n**Help:** ${prefix}config <key>\n**Set:** ${prefix}config <key> <value>`
                },
                {
                    "name": `prefix: \`${prefix}\``,
                    "value": `Try: \`${prefix}config prefix ^\``
                },
                {
                    "name": `logChannel: \`${config.logChannel}\``,
                    "value": `Try: \`${prefix}config logChannel #serverlogs\`\nThe number of members will be logged to the log channel every midnight. If you want to disable this, do \`${prefix}config logChannel false\``
                },
                {
                    "name": `milestone: \`${config.milestone}\``,
                    "value": `Try: \`${prefix}config milestone 100\`\nEvery X members, a milestone will be logged in your milestoneChannel. Set to 0 to disable.`
                },
                {
                    "name": `milestoneChannel: \`${config.milestoneChannel}\``,
                    "value": `Try: \`${prefix}config milestoneChannel #joinlogs\`\nChannel to log milestones in.`
                }
            ]);
            return message.channel.send({
                embed
            });
        }
        let validKeys = ['prefix', 'logChannel', 'milestone', 'milestoneChannel'];

        if (!validKeys.includes(key)) {
            embed = getErrorEmbed('Invalid Key: `' + key + '`',
                'Valid configuration keys are: `' + validKeys.join(', ') + '`'
            );
            return message.channel.send({
                embed
            });
        }

        if (!value) {
            let helps = {
                prefix: 'Changes what I respond to in front of commands',
                logChannel: 'Changes the channel that I log member counts to each midnight. To unset this, set it to "false"',
                milestone: 'Defines how many members counts as a milestone. For example, if this is set to 100, I\'ll celebrate at 100, 200, 300, etc. members. Set to 0 to disable.',
                milestoneChannel: 'Changes the channel that I send milestones in.'
            }
            embed = getEmbed('Config', '', 6802791, [{
                name: `\`${key}\` usage:`,
                value: helps[key]
            }]);
            return message.channel.send({
                embed
            });
        }

        switch (key) {
            case 'prefix':
                if (value.length > 4 || value.length < 1) {
                    let embed = getErrorEmbed('Invalid Prefix: `' + key + '`',
                        'Prefix must be less than 5 characters'
                    );
                    return message.channel.send({
                        embed
                    });
                }
                await message.guild.configs.update('prefix', value);
                embed = getEmbed('Config', '', 6802791, [{
                    name: 'Prefix set!',
                    value: `The new prefix is \`${value}\``
                }]);
                return message.channel.send({
                    embed
                });

            case 'logChannel':
                if (value === 'false') {

                    await message.guild.configs.update('logChannel', null);

                    embed = getEmbed('Config', '', 6802791, [{
                        name: 'Log Channel unset!',
                        value: `No longer logging member counts`
                    }]);

                    return message.channel.send({
                        embed
                    });
                }

                await message.guild.configs.update('logChannel', value);

                embed = getEmbed('Config', '', 6802791, [{
                    name: 'Log Channel set!',
                    value: `The new log channel is <#${message.guild.configs.logChannel}>`
                }]);

                return message.channel.send({
                    embed
                });

                break;
            case 'milestoneChannel':
                if (value === 'false') {

                    await message.guild.configs.update('milestoneChannel', null);

                    embed = getEmbed('Config', '', 6802791, [{
                        name: 'Milestone Channel unset!',
                        value: `No longer logging milestones`
                    }]);

                    return message.channel.send({
                        embed
                    });
                }

                await message.guild.configs.update('milestoneChannel', value);

                embed = getEmbed('Config', '', 6802791, [{
                    name: 'Milestone Channel set!',
                    value: `The new milestone channel is <#${message.guild.configs.milestoneChannel}>${config.milestone > 0 ? '' : '\n*Note: this will do nothing until you set the config "milestone".*'}`
                }]);

                return message.channel.send({
                    embed
                });

                break;
            case 'milestone':
                let milestone = parseInt(value);
                if (!Number.isInteger(milestone)) throw 'milestone must be an integer.'
                if (!milestone || milestone < 0 || milestone > 1000000) {
                    embed = getErrorEmbed('Invalid Milestone: `' + value + '`',
                        'Milestone must be a positive integer, or 0.'
                    );
                    return message.channel.send({
                        embed
                    });
                }
                if (milestone === 0) {

                    embed = getEmbed('Config', '', 6802791, [{
                        name: 'Milestone unset!',
                        value: `No longer logging milestones`
                    }]);

                    return message.channel.send({
                        embed
                    });
                }
                await message.guild.configs.update('milestone', milestone);
                embed = getEmbed('Config', '', 6802791, [{
                    name: 'Milestone set!',
                    value: `The new milestone is ${milestone}${config.milestoneChannel ? '' : '\n*Note: this will do nothing until you set the config "milestoneChannel".*'}`
                }]);

                return message.channel.send({
                    embed
                });
                break;
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};