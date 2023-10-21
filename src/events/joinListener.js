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

        //let channel = interaction.channels.find(c => c.id === '1163883678540251256');

        //let message = MessagePayload.create(channel, {
          //  embeds: [embed]
       // });

       // await channel.send(`<@${interaction.user.id}>`).then(channel.send(message))

    
    })

}