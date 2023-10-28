const {
    ButtonBuilder,
    EmbedBuilder,
    MessagePayload,
    ActionRowBuilder,
    ButtonStyle,
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js")
const {
    CommandType
} = require("wokcommands");
module.exports = {
    category: 'Utils',
    name: 'embed',
    description: 'Build an embed to send to a specified channel',
    testOnly: true,
    type: CommandType.SLASH,
    options: [{
            name: 'channel',
            description: 'The channel to send the embed to',
            required: true,
            type: ApplicationCommandOptionType.Channel
        },
        {
            name: 'title',
            description: 'The title of the embed',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'description',
            description: 'The embed content',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'image',
            description: 'The image url for the embed',
            required: false,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'colour',
            description: 'The embed colour',
            required: false,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'thumbnail',
            description: 'The image url for the embed thumbnail',
            required: false,
            type: ApplicationCommandOptionType.String
        },

    ],

    callback: async ({
        interaction,
        client
    }) => {

        const channel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('title')
        const description = interaction.options.getString('description')
        const image = interaction.options.getString('image')
        const colour = interaction.options.getString('colour')
        const thumbnail = interaction.options.getString('thumbnail')



        if (!interaction.member.roles.cache.has('1165680295547261130')) {
            interaction.reply({
                content: 'You do not have permission to run this command',
                ephemeral: true
            })

        } else {
            try {
                const embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setImage({
                        url: image
                    })
                    .setThumbnail({
                        url: thumbnail
                    })
                    .setColor(colour)

                let msg = MessagePayload.create(channel, {
                    embeds: [embed]
                })
                await channel.send(msg)


            } catch (e) {
                interaction.reply({
                    content: `An error occured: ${e}`,
                    ephemeral: true
                })
                console.log(e)

            }
        }

    }
}