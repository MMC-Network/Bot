const {MessageActionRow, MessageButton, MessageEmbed, MessagePayload, MessageSelectMenu, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");
const { CommandType } = require("wokcommands");
module.exports = {
    category: 'Administration',
    name: 'rename',
    description: 'Rename a channel',
    testOnly: true,
    type: CommandType.SLASH,
    options: [
        {
            name: 'name',
            description: 'New channel name',
            required: true,
            type: ApplicationCommandOptionType.String
        },
    ],

    callback: async ({interaction, client, msg}) => {

        const name = interaction.options.getString('name')

        const success = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`Successfully renamed the channel to ${name}`)


        
            if (interaction.member.guild.roles.cache.has('1165331497423753248')) {

                let logMessage = MessagePayload.create(interaction.channel, {
                    embeds: [success]
                })
                await interaction.channel.setName(name).then(interaction.reply(logMessage))


            } else {
                interaction.reply({content: "No Permission", ephemeral: true})
            
        }


    }
}