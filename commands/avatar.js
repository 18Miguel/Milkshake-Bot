const { SlashCommandBuilder } = require('@discordjs/builders');
const { Color } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(client, interaction) {
		let avatarEmbed = new MessageEmbed()
			.setTitle(`📸 Your avatar`)
			.setColor(Color)
			.setImage(interaction.user.displayAvatarURL({ size: 512, dynamic: true}))
			.setTimestamp();
		const user = interaction.options.getUser('target');
		if(user){
			avatarEmbed
				.setTitle(`📸 ${user.username}'s avatar`)
				.setImage(user.displayAvatarURL({ size: 512, dynamic: true}));
				return interaction.reply({ embeds: [avatarEmbed] });
		}
		return interaction.reply({ embeds: [avatarEmbed] });
	},
};