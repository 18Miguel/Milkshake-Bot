const { SlashCommandBuilder } = require('@discordjs/builders');
const { Color } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display information about this server.'),
	async execute(client, interaction) {
        const serverEmbed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}'s Info`)
            .addField('Total members', `${interaction.guild.memberCount}`)
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setColor(Color)
            .setTimestamp();
        return interaction.reply({ embeds: [serverEmbed] });
    },
};