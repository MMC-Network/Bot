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

        if(interaction.customId === 'suggestionModal') {
            try {


                const suggestion = interaction.fields.getTextInputValue('suggestionInput');

                let channel = interaction.guild.channels.cache.get('1186321201384136735');


                const tembed = new EmbedBuilder()
                .setTitle("New Suggestion")
                .setDescription(suggestion)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
                .setColor('Green')
                .setTimestamp()
                

                let embedMsg = MessagePayload.create(channel, {
                    embeds: [tembed]
                })

                const toreact = await channel.send(embedMsg).then(interaction.reply({
                    content: 'Suggestion Sent',
                    ephemeral: true
                }))

                await toreact.react(`<:greentick:1116854720515018824>`)
                await toreact.react(`<:redcross:1116854666861490276>`)
                
    
            } catch (e) {
                interaction.reply(`An error occurred: ${e.message}`)
        }
    }


        
})
}