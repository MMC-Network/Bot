const {
    client
} = require("../index");
const {
    EmbedBuilder,
    MessagePayload,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require("discord.js");
const transcripts = require('discord-html-transcripts');
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'close') {

            if (!interaction.member.roles.cache.has('1163568384559042642')) {

                interaction.reply({
                    content: 'You do not have permission to close tickets',
                    ephemeral: true
                })

            } else {


                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.channel.topic,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory],
                        deny: [PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: '1163568384559042642',
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    }
                ])


                const reopenButton = new ButtonBuilder()
                    .setCustomId('re-open')
                    .setEmoji('🔓')
                    .setLabel('Re-Open')
                    .setStyle(ButtonStyle.Secondary)



                const deleteButton = new ButtonBuilder()
                    .setCustomId('delete')
                    .setEmoji('🗑️')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Secondary)



                const transcriptButton = new ButtonBuilder()
                    .setCustomId('transcript')
                    .setEmoji('📜')
                    .setLabel('Transcript')
                    .setStyle(ButtonStyle.Secondary)



                const row1 = new ActionRowBuilder()
                    .addComponents(reopenButton, transcriptButton, deleteButton)

                const closedEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Ticket Closed')
                    .setDescription(`This ticket was closed by <@${interaction.user.id}> (${interaction.user.tag})`)
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.avatarURL()
                    })
                    .setTimestamp()

                let closedMsg = MessagePayload.create(interaction.channel, {
                    embeds: [closedEmbed],
                    components: [row1]
                })

                interaction.channel.send(closedMsg)





            }

        }


        if (interaction.customId === 're-open') {

            await interaction.deferUpdate()

            interaction.channel.permissionOverwrites.set([{
                id: interaction.guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: interaction.channel.topic,
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages],
            },
            {
                id: '1163568384559042642',
                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
            }
        ])

            const reopenedEmbed = new EmbedBuilder()
                .setColor('Orange')
                .setTitle('Ticket Re-Opened')
                .setDescription(`This ticket was re-opened by <@${interaction.user.id}> (${interaction.user.tag})`)
                .setFooter({
                    text: interaction.user.tag,
                    iconURL: interaction.user.avatarURL()
                })
                .setTimestamp()

            let closedMsg = MessagePayload.create(interaction.channel, {
                embeds: [reopenedEmbed]
            })

            await interaction.channel.send(closedMsg)

        }

        if (interaction.customId === 'transcript') {

            if (!interaction.member.roles.cache.has('1163568384559042642')) {

                interaction.reply({
                    content: 'You do not have permission to save transcripts',
                    ephemeral: true
                })

            } else {

                await interaction.deferUpdate()

            const attachment = await transcripts.createTranscript(interaction.channel, {
                limit: 10000,
                returnType: 'attachment',
                fileName: `${interaction.channel.name}.html`,
                saveImages: true
            });

            let tchannel = interaction.guild.channels.cache.find(c => c.id === '1163904701234942062')

            let tembed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Transcript Saved')
            .setDescription(`The ticket transcript has been saved by <@${interaction.user.id}> (${interaction.user.tag})`)

            let tmsg = MessagePayload.create(interaction.channel, {
                embeds: [tembed]
            })

            await interaction.channel.send(tmsg)

            let savedEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('New Transcript')
            .setDescription(`Ticket transcript for ${interaction.channel.name}. Ticket closed by ${interaction.user.tag}`)
            .setTimestamp()

            let transcriptmsg = MessagePayload.create(tchannel, {
                embeds: [savedEmbed],
                files: [attachment]
            })

            await tchannel.send(transcriptmsg)
        }

            

        }

        if (interaction.customId === 'delete') {

            if (!interaction.member.roles.cache.has('1163568384559042642')) {

                interaction.reply({
                    content: 'You do not have permission to delete tickets',
                    ephemeral: true
                })

            } else {

                const deleting = new EmbedBuilder()
                    .setColor('Yellow')
                    .setDescription("This ticket will be deleted in 10 seconds")

                let deleteMsg = MessagePayload.create(interaction.channel, {
                    embeds: [deleting]
                })

                await interaction.channel.send(deleteMsg).then(
                    interaction.deferUpdate().then(
                        setTimeout(() => {
                            interaction.channel.delete()

                        }, 10000)
                    ))

            }

        }

    })
}