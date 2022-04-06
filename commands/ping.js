const { SlashCommandBuilder } = require('@discordjs/builders');
const { Color } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with client ping!'),
	async execute(client, interaction) {
		const pongEmbed = new MessageEmbed()
			.setColor(Color)
			.setDescription(`🏓 Pong! Client: ${client.ws.ping}ms`);
		
		return interaction.reply({ embeds: [pongEmbed]});
	},
};