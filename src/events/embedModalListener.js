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
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        if(interaction.customId === 'embedModal') {
            try {


                const title = interaction.fields.getTextInputValue('embedTitleInput');
                const description = interaction.fields.getTextInputValue('embedDescriptionInput');
                const footer = interaction.fields.getTextInputValue('embedFooterInput');
                const color = interaction.fields.getTextInputValue('embedColourInput');

                const tembed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setFooter({
                    text: footer
                })
                .setColor(color)
                .setTimestamp()
                

                let embedMsg = MessagePayload.create(interaction.channel, {
                    embeds: [tembed]
                })

                await interaction.channel.send(embedMsg).then(interaction.reply({
                    content: 'Embed Sent',
                    ephemeral: true
                })
    )
            } catch (e) {
                interaction.reply(`An error occurred: ${e.message}`)
        }
    }


        
})
}