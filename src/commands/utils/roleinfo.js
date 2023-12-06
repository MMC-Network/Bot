const {
    EmbedBuilder,
    MessagePayload,
    ApplicationCommandOptionType,
    PermissionsBitField
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");

module.exports = {
    category: 'Utils',
    name: 'roleinfo',
    description: 'Get the information about a role',
    testOnly: true,
    type: CommandType.SLASH,
    options: [{
        name: 'role',
        description: 'The role to get information about',
        required: true,
        type: ApplicationCommandOptionType.Role
    }],
    callback: async ({
        interaction,
        client
    }) => {

        const role = interaction.options.getRole('role')

        let r = interaction.guild.roles.cache.get(role.id)

        const embed = new EmbedBuilder()
        .setTimestamp()
        .setTitle(`Information about ${role.name}`)
        .setColor(role.color)
        .addFields(
            {name: 'ID', value: role.id},
            {name: 'Mention', value: `<@&${role.id}>`},
            {name: 'Members', value: `${role.members.size}`, inline: true},
            {name: 'Colour', value: role.hexColor},
            {name: 'Position', value: `${role.position}/${interaction.guild.roles.cache.size}`},
            {name: 'Hoisted', value: role.hoist ? 'Yes' : 'No'},
            {name: 'Mentionable', value: role.mentionable ? 'Yes' : 'No'}
        )
        


        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed]
        })

        await interaction.reply(msg)
    }
}