const { SlashCommandBuilder } = require('@discordjs/builders');
const { ProfileImage, Color, Version, Update } = require('../config.json');
const { MessageEmbed } = require('discord.js');
const aboutEmbed = new MessageEmbed()
    .setTitle('🍦 Milkshake Information')
    .addField('Version', Version)
    .addField('Last Update', Update)
    .setColor(Color)
    .setImage(ProfileImage)
    .setDescription('I was programmed by <@517085467942977536>')
    .setTimestamp();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Some informantion about me!'),
	async execute(client, interaction) {
		return interaction.reply({ embeds: [aboutEmbed] });
	},
};