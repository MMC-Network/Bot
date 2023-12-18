const {
    client
} = require("../index");
const {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'suggestion-button') {

            const suggestionModal = new ModalBuilder()
            .setCustomId('suggestionModal')
            .setTitle('Create Suggestion')


            const suggestionInput = new TextInputBuilder()
            .setCustomId('suggestionInput')
            .setLabel('What is your suggestion?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

        


            const row1 = new ActionRowBuilder().addComponents(suggestionInput);

            suggestionModal.addComponents(row1);

            await interaction.showModal(suggestionModal);
            

        }



    })
}