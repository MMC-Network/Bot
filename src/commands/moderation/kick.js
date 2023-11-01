const {
    EmbedBuilder,
    Embed,
    MessagePayload,
    ApplicationCommandOptionType
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");

module.exports = {
    catgeory: 'Moderation',
    name: 'kick',
    description: 'Kick a user from the server',
    testOnly: true,
    type: CommandType.SLASH,
    maxArgs: 2,
    options: [{
            name: 'user',
            description: 'The user to kick',
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'reason',
            description: 'The reason for kicking the user',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    callback: async ({
        interaction,
        client
    }) => {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        let logChannel = interaction.guild.channels.cache.get('1166039509855653998');

        const success = new EmbedBuilder()
            .setTitle("User Successfully Kicked")
            .setDescription(`<:greentick:1116854720515018824> <@${user.id}> has been kicked`)
            .addFields({
                name: 'Username',
                value: `\`${user.tag}\``,
                inline: true
            }, {
                name: 'User ID',
                value: `\`${user.id}\``,
                inline: true
            }, {
                name: 'Kicked By',
                value: `<@${interaction.user.id}>`,
                inline: true
            }, {
                name: "Punishment Reason",
                value: "```" + ` ${reason.toString()} ` + "```",
                inline: false
            })
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp()
            .setColor('#f01d1d')
            .setFooter({
                text: `Executed by ${interaction.user.tag}`
            })

        const logEmbed = new EmbedBuilder()
            .setTitle("NEW KICK")
            .setDescription(`<:greentick:1116854720515018824> <@${user.id}> has been kicked from ${interaction.guild.name}`)
            .addFields({
                name: 'Username',
                value: `\`${user.tag}\``,
                inline: true
            }, {
                name: 'User ID',
                value: `\`${user.id}\``,
                inline: true
            }, {
                name: 'Kicked By',
                value: `<@${interaction.user.id}>`,
                inline: true
            }, {
                name: "Punishment Reason",
                value: "```" + ` ${reason.toString()} ` + "```",
                inline: false
            })
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp()
            .setColor('#f01d1d')
            .setFooter({
                text: `Executed by ${interaction.user.tag}`
            })

        let logMsg = MessagePayload.create(logChannel, {
            embeds: [logEmbed]
        })

        let successMsg = MessagePayload.create(interaction.channel, {
            embeds: [success]
        })

        if (!interaction.member.roles.cache.has('1163568181399535688')) {

            interaction.reply({
                content: 'You do not have permission to kick users',
                ephemeral: true
            })

        } else {
            try {
                logChannel.send(logMsg)

                await interaction.reply(successMsg)

                await interaction.guild.members.kick(user, {
                    reason: reason
                })
            } catch (e) {
                const err = new EmbedBuilder()
                    .setTitle("ERROR")
                    .setDescription(`<:warningsymbol:1114195459544715275> An error has occured`)
                    .addFields({
                        name: "Error Logged",
                        value: "```" + ` ${e} ` + "```",
                        inline: false
                    })
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setColor('#f01d1d')
                    .setFooter({
                        text: `Executed by ${interaction.user.tag}`
                    })

                let emsg = MessagePayload.create(interaction.channel, {
                    embeds: [err]
                })
                interaction.channel.send(emsg)

            }
        }
    }
}