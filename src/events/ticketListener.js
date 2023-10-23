const { EmbedBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessagePayload } = require("discord.js");
const {client} = require("../index");
module.exports = async (instance, message) => {

    const genSupOpened = new EmbedBuilder()
    .setColor('Purple')
    .setTitle('General Support Ticket')
    .setDescription('>>> Thank you for contacting the support team \nPlease tell us how we can help and await a response!')
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/attachments/1026962944103284749/1163900256505843882/games_vault_tp.png?ex=65414195&is=652ecc95&hm=7470d8d25f9e508c74c354e750e3c4487425e613e2cf82a095a20af27b33ffa4&")
    .setFooter({text: 'Ticket System'})

    client.on('interactionCreate', async(interaction) => {
        if(!interaction.isButton()) return;

        if(interaction.customId === 'gensup') {
            let channelName = `ticket-${interaction.user.tag}`
            let parent = '1163570276366307398'

            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${interaction.user.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: '1163568384559042642',
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                }
            ],
            }).then(async channel => {
                const closeButton = new ButtonBuilder()
                .setCustomId('close')
                .setEmoji('🔒')
                .setLabel('Close')
                .setStyle(ButtonStyle.Danger)

                const claimButton = new ButtonBuilder()
                .setCustomId('claim')
                .setEmoji('🤚🏻')
                .setLabel('Claim')
                .setStyle(ButtonStyle.Primary)

                const row1 = new ActionRowBuilder()
                .addComponents(closeButton, claimButton)

                let msg = MessagePayload.create(channel, {
                    embeds: [genSupOpened],
                    components: [row1]
                })

                await interaction.reply({
                    content: `Your ticket has been made at <#${channel.id}>`,
                    ephemeral: true
                })

                await channel.send(msg)
                await channel.send(`<@${interaction.user.id}> <@&1163568384559042642>`)
            })
        }
    })
}