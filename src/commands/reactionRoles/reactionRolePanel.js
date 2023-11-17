const {MessageEmbed, MessagePayload, Message, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require("discord.js");
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Roles',
    name: 'reaction-role-panel',
    description: "Send reaction role panel",
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({interaction, client}) => {

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Select Roles')
            .setDescription('Select a role from the dropdown below')
            .setThumbnail(interaction.guild.iconURL())
            .setImage('https://media.discordapp.net/attachments/1168309889899167864/1174866038895169556/static.png?ex=65692643&is=6556b143&hm=675ca5874989a52d2d849e9ae32d09ee9bd7c18c09d5e17a3582dd7dc17727e0&=')
            .setFooter({
                text: 'Reaction Roles'
            })
            .setTimestamp()

        
            const notifiedButton = new ButtonBuilder()
            .setCustomId('notified-role')
            .setLabel('Announcements')
            .setEmoji('📣')
            .setStyle(ButtonStyle.Primary)

            const updatesButton = new ButtonBuilder()
            .setCustomId('updates-role')
            .setLabel('Updates')
            .setEmoji('📜')
            .setStyle(ButtonStyle.Primary)

            const giveawayButton = new ButtonBuilder()
            .setCustomId('giveaway-role')
            .setLabel('Giveaways')
            .setEmoji('🎉')
            .setStyle(ButtonStyle.Primary)

            
        const row1 = new ActionRowBuilder()
            .addComponents(notifiedButton, updatesButton, giveawayButton)

        let message = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        });

        await interaction.channel.send(message)


    }

}