const {MessageEmbed, MessagePayload, Message, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require("discord.js");
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Suggestions',
    name: 'suggestion-panel',
    description: "Send suggestion panel",
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({interaction, client}) => {

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Create a suggestion')
            .setDescription(`Want to suggest a new feature? Well you have come to the right place! \nClick the __Create Suggestion__ button below and fill out the prompt! \n\nAfter creating the suggestion it will be posted in our suggestions channel where people can vote on it and discuss it.`)
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()

        
            const suggestionButton = new ButtonBuilder()
            .setCustomId('suggestion-button')
            .setLabel('Create Suggestion')
            .setEmoji('💭')
            .setStyle(ButtonStyle.Primary)

            
            
        const row1 = new ActionRowBuilder()
            .addComponents(suggestionButton)

        let message = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        });

        await interaction.channel.send(message)


    }

}