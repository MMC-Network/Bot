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
const transcripts = require('discord-html-transcripts');
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'notified-role') {

            if (!interaction.member.roles.cache.has('1171508686825459802')) {

                interaction.member.roles.add('1171508686825459802')

                interaction.reply({
                    content: 'Subscribed to announcements',
                    ephemeral: true
                })

            } else {

                interaction.member.roles.remove('1171508686825459802')

                interaction.reply({
                    content: 'Unsubscribed from announcements',
                    ephemeral: true
                })

            }

        }

        if (interaction.customId === 'updates-role') {

            if (!interaction.member.roles.cache.has('1171508725194952796')) {

                interaction.member.roles.add('1171508725194952796')

                interaction.reply({
                    content: 'Subscribed to updates',
                    ephemeral: true
                })

            } else {

                interaction.member.roles.remove('1171508725194952796')

                interaction.reply({
                    content: 'Unsubscribed from updates',
                    ephemeral: true
                })

            }

        }

        if (interaction.customId === 'giveaway-role') {

            if (!interaction.member.roles.cache.has('1171508564666372157')) {

                interaction.member.roles.add('1171508564666372157')

                interaction.reply({
                    content: 'Subscribed to giveaways',
                    ephemeral: true
                })

            } else {

                interaction.member.roles.remove('1171508564666372157')

                interaction.reply({
                    content: 'Unsubscribed from giveaways',
                    ephemeral: true
                })

            }

        }


    })
}