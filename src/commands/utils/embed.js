const {
    ButtonBuilder,
    EmbedBuilder,
    MessagePayload,
    ActionRowBuilder,
    ButtonStyle,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
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

    callback: async ({
        interaction,
        client
    }) => {

        if (!interaction.member.roles.cache.has('1163568046443602000' || interaction.member.roles.cache.has('1165331497423753248'))) {

            interaction.reply({
                content: 'You do not have permission to force delete tickets',
                ephemeral: true
            })

        } else {

            const embedModal = new ModalBuilder()
            .setCustomId('embedModal')
            .setTitle('Embed Builder')

            const embedTitleInput = new TextInputBuilder()
            .setCustomId('embedTitleInput')
            .setLabel('Embed Title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const embedDescriptionInput = new TextInputBuilder()
            .setCustomId('embedDescriptionInput')
            .setLabel('Embed Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

            const embedColourInput = new TextInputBuilder()
            .setCustomId('embedColourInput')
            .setLabel('Embed Colour (Hex code without #)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)

            const embedFooterInput = new TextInputBuilder()
            .setCustomId('embedFooterInput')
            .setLabel('Embed Footer')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)


            const row1 = new ActionRowBuilder().addComponents(embedTitleInput);
            const row2 = new ActionRowBuilder().addComponents(embedDescriptionInput);
            const row3 = new ActionRowBuilder().addComponents(embedColourInput);
            const row4 = new ActionRowBuilder().addComponents(embedFooterInput);

            embedModal.addComponents(row1, row2, row3, row4);

            await interaction.showModal(embedModal);
        }

        

            }
        }

    
