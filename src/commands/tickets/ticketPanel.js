const { ButtonBuilder, EmbedBuilder, MessagePayload, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Tickets',
    name: 'ticketpanel',
    description: 'Send panel for ticket selection',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({interaction, client}) => {

        const openButton = new ButtonBuilder()
                        .setCustomId('gensup')
                        .setEmoji('📩')
                        .setLabel('Create a Ticket')
                        .setStyle(ButtonStyle.Primary)

                    const row1 = new ActionRowBuilder()
                        .addComponents(openButton)

                    


        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Ticket Categories')
        .setThumbnail('https://media.discordapp.net/attachments/1026962944103284749/1165677083926724688/games_vault_logo_1.png?ex=6547b862&is=65354362&hm=0b84dbb66e107688897d28267a8461fead8279fe928b343a29912fefa08c995e&=')
        .setDescription('🌟 Hey there! Having some trouble? \nOur support tickets are the best way to get in contact with the support team. A support ticket can be opened for any kind of issue. \n\n📩 » General Support \n\n⏰ Our support team members handle tickets as quickly as they can. Unless it\'s urgent, please don\'t ping staff.')
        .setFooter({text: 'Ticket System'})
        .setTimestamp()

    
        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        })

        await interaction.channel.send(msg)

    }
}