const {MessageActionRow, MessageButton, MessageEmbed, MessagePayload, MessageSelectMenu, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
const transcripts = require('discord-html-transcripts');

module.exports = {
    category: 'Administration',
    name: 'force-close',
    description: 'ONLY USE IN A TICKET',
    testOnly: true,
    type: CommandType.SLASH,
    

    callback: async ({interaction, client, msg}) => {

        if (!interaction.member.roles.cache.has('1165331497423753248')) {

            interaction.reply({
                content: 'You do not have permission to force delete tickets',
                ephemeral: true
            })

        } else {

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

            const deleting = new EmbedBuilder()
                .setColor('Yellow')
                .setDescription("This ticket will be deleted in 10 seconds")

            let deleteMsg = MessagePayload.create(interaction.channel, {
                embeds: [deleting]
            })

            await interaction.channel.send(deleteMsg).then(
        
                    setTimeout(() => {
                        interaction.channel.delete()

                    }, 10000)
                )

        }


    }
}