const { EmbedBuilder, MessagePayload } = require('discord.js');
const { client } = require('../index');

module.exports = async(interaction) => {

    client.on('guildMemberRemove', async(interaction) => {


        let channel = interaction.guild.channels.cache.find(c => c.id === '1166037339949236234');

        //let message = MessagePayload.create(channel, {
          //  embeds: [embed]
       // });

       await channel.send(`<@${interaction.user.id}> (${interaction.user.id}) has left the discord`)

    
    })

}