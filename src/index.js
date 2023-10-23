const { Client, IntentsBitField, GatewayIntentBits, ActivityType } = require('discord.js');
const CH = require('wokcommands');
const path = require('path');
const { type } = require('os');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        IntentsBitField.Flags.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds
    ]
});

module.exports = { client }

client.on('ready', async () => {
    console.log('The bot is online')

    client.user.setActivity({name: `over everyone 😈`, type: ActivityType.Watching})

    new CH({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        testServers: ['1026962943616753735'],
        botOwners: ['818539885950009454', '306506629115805696', '448147561019080705'] // J - R - C
    })
})

client.login('MTE2MzkwMjU1Nzk5NTkzMzc4Ng.G-3Hmy.4AuaQ231Yhq7QcdlgG8Qd5cUHnYpnVTWFe0Af8')