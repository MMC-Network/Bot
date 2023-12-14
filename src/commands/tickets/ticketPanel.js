const {
    ButtonBuilder,
    EmbedBuilder,
    MessagePayload,
    ActionRowBuilder,
    ButtonStyle
} = require("discord.js")
const {
    CommandType
} = require("wokcommands");
module.exports = {
    category: 'Tickets',
    name: 'ticketpanel',
    description: 'Send panel for ticket selection',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({
        interaction,
        client
    }) => {

        const gensupButton = new ButtonBuilder()
            .setCustomId('gensup')
            .setEmoji('📩')
            .setLabel('General Support')
            .setStyle(ButtonStyle.Primary)

        const purchasesupButton = new ButtonBuilder()
            .setCustomId('purchasesup')
            .setEmoji('🛒')
            .setLabel('Purchase Support')
            .setStyle(ButtonStyle.Primary)

        const row1 = new ActionRowBuilder()
            .addComponents(gensupButton)




        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Ticket Categories')
            .setThumbnail('https://images-ext-2.discordapp.net/external/tv3OhZWo84AjRHiCBH5iHzwCNHTGa08dRDdLjqGo_B8/%3Fsize%3D512/https/cdn.discordapp.com/icons/1026962943616753735/0bd564d21b75d97e0b82a0983d62608c.png?format=webp&quality=lossless')
            .setDescription('🌟 Hey there! Having some trouble? \nOur support tickets are the best way to get in contact with the support team. A support ticket can be opened for any kind of issue. \n\n📩 » General Support \n🛒 » Purchase Support \n\n⏰ Our support team members handle tickets as quickly as they can. Unless it\'s urgent, please don\'t ping staff.')
            .setFooter({
                text: 'Ticket System'
            })
            .setTimestamp()


        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        })

        await interaction.channel.send(msg)

    }
}