const { ButtonBuilder, EmbedBuilder, MessagePayload, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Moderation',
    name: 'clear',
    description: 'Clear messages (Default 10)',
    testOnly: true,
    type: CommandType.SLASH,
    maxArgs: 1,
    expectedArgs: '[amount]',

    callback: async ({interaction, client, args}) => {

        if (!interaction.member.roles.cache.has('1163568181399535688')) {

            interaction.reply({
                content: 'You do not have permission to clear messages',
                ephemeral: true
            })

        } else {

            const amount = args.length ? parseInt(args.shift()) : 10;

            const success = new EmbedBuilder()
            .setTitle("Messages cleared")
            .setDescription(`<:greentick:1116854720515018824> Deleted ${amount} messages from <#${interaction.channel.id}>`)
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setColor('#1df028')

            const { size } = await interaction.channel.bulkDelete(amount, true)

            return {
                embeds: [success],
                custom: true
            }

        }

    }
}