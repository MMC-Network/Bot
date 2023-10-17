const { EmbedBuilder, MessagePayload } = require('discord.js');
const { client } = require('../index');

module.exports = async(interaction) => {

    client.on('guildMemberAdd', async(interaction) => {

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Welcome!')
        .setDescription(`Welcome <@${interaction.user.id}> to **${interaction.guild.name}**`)
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        let mainServer = client.guilds.cache.get('1026962943616753735')
        let channel = mainServer.channels.cache.find(c => c.id === '1163883678540251256');

        let message = MessagePayload.create(channel, {
            embeds: [embed]
        });

        if(interaction.guild.id === '1026962943616753735') {

        await channel.send(`<@${interaction.user.id}>`).then(channel.send(message))

        }
    })

}