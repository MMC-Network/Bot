const {
    EmbedBuilder,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    MessagePayload
} = require("discord.js");
const {
    client
} = require("../index");
module.exports = async (instance, message) => {

    const genSupOpened = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('General Support Ticket')
        .setDescription('>>> Thank you for contacting the support team \nPlease tell us how we can help and await a response!')
        .setTimestamp()
        .setThumbnail("https://media.discordapp.net/attachments/1026962944103284749/1168305159319859390/games_vault_tp.png?ex=655147f8&is=653ed2f8&hm=5b9ed6caed880810dc5121aa35eaf9f728bb9a760c522fd86434d57c23fb3354&=")
        .setFooter({
            text: 'Ticket System'
        })

        const purchaseSupOpened = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('Purchase Support Ticket')
        .setDescription('>>> Thank you for contacting the support team \nPlease tell us how we can help and await a response!')
        .setTimestamp()
        .setThumbnail("https://media.discordapp.net/attachments/1026962944103284749/1168305159319859390/games_vault_tp.png?ex=655147f8&is=653ed2f8&hm=5b9ed6caed880810dc5121aa35eaf9f728bb9a760c522fd86434d57c23fb3354&=")
        .setFooter({
            text: 'Ticket System'
        })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'gensup') {
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
                        id: '1163568181399535688',
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
                await channel.send(`<@${interaction.user.id}> <@&1163568181399535688>`)
            })
        }

        if (interaction.customId === 'purchasesup') {
            let channelName = `ticket-${interaction.user.tag}`
            let parent = '1167621458869092402'

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
                        id: '1163568046443602000',
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
                    embeds: [purchaseSupOpened],
                    components: [row1]
                })

                await interaction.reply({
                    content: `Your ticket has been made at <#${channel.id}>`,
                    ephemeral: true
                })

                await channel.send(msg)
                await channel.send(`<@${interaction.user.id}> <@&1163568046443602000>`)
            })
        }
    })
}