const {
    Command
} = require('klasa');

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
            description: 'Sets the bot\'s presence',
            extendedHelp: 'No extended help available.',
            usage: '<status|playing|watching|listening|streaming> [offline|off|gray|grey|away|gone|yellow|red|disturb|online|idle|invisible|dnd] [playing:str] [watching:str] [listening:str] [streaming:url]',
            usageDelim: ' ',
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(msg, [type, status = 'online', ...str]) {
        str = str.length > 0 ? str.join(' ') : null;
        switch (status) {
            case 'offline':
            case 'off':
            case 'gray':
            case 'grey':
                status = 'invisible'; break;
            case 'away':
            case 'gone':
            case 'yellow':
                status = 'idle'; break;
            case 'red':
            case 'disturb':
                status = 'dnd'; break;
        }
        switch (type) {
            case 'status':
                await this.client.user.setStatus(status);
                return msg.send(`Status changed to \`${status}\``)
                    .catch(console.error);
            case 'watching':
                await this.client.user.setActivity(str, {
                    type: 'WATCHING'
                });
                return msg.send(`${str ? `Watching changed to \`${str}\`` : 'Watching cleared'}`)
                    .catch(console.error);
            case 'listening':
                await this.client.user.setActivity(str, {
                    type: 'LISTENING'
                });
                return msg.send(`${str ? `Listening changed to \`${str}\`` : 'Listening cleared'}`)
                    .catch(console.error);
            case 'streaming':
                await this.client.user.setActivity(str, {
                    type: 'STREAMING'
                });
                return msg.send(`${str ? `Streaming changed to \`${str}\`` : 'Streaming cleared'}`)
                    .catch(console.error);
            default:
                await this.client.user.setActivity(str);
                return msg.send(`${str ? `Game changed to \`${str}\`` : 'Game cleared'}`)
                    .catch(console.error);
        }
    }
    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};