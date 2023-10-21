const {EmbedBuilder, MessagePayload, ApplicationCommandOptionType, PermissionsBitField} = require("discord.js");
const { CommandType } = require("wokcommands");

module.exports = {
    category: 'Tickets',
    name: 'add',
    description: 'Adds a user to the ticket',
    testOnly: true,
    ownerOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'user',
            description: 'The user to add to the ticket',
            required: true,
            type: ApplicationCommandOptionType.User
        }
    ],
    callback: async ({interaction, client}) => {

        const user = interaction.options.getUser('user')
        const userid = user.id
        

        const success = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`<@${user.id}> has been added to the ticket!`)
        .setTimestamp()

        if (!interaction.member.roles.cache.has('1163568384559042642')) {

            interaction.reply({
                content: 'You do not have permission to add people to tickets',
                ephemeral: true
            })

        } else {

                await interaction.channel.permissionOverwrites.edit([
                    {
                        id: userid.member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    }

                ])

                let msg = MessagePayload.create(interaction.channel, {
                    embeds: [success]
                })

                await interaction.channel.send(msg)
            

        } 


    }
}