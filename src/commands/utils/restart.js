const {EmbedBuilder, MessagePayload, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Administration',
    name: 'restart',
    description: 'Restarts the bot',
    type: CommandType.SLASH,
    testOnly: true,
    ownerOnly: true,
    
    
    callback: async ({interaction, client}) => {

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription('The bot is being restarted')
        .setTimestamp()

        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed]
        })

        

        await interaction.reply({embeds: [embed], ephemeral: true})
        await process.exit()

    },
}