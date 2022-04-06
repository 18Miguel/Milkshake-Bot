const { SlashCommandBuilder } = require('@discordjs/builders');
const { Color } = require('../config.json');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-information')
		.setDescription('Display info about yourself.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s info to show')),
	async execute(client, interaction){
		const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
		const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
		let member = interaction.guild.members.cache.get(interaction.user.id);
		const user = interaction.options.getUser('target');
		const userEmbed = new MessageEmbed()
			.setTitle(`🔎 Your Info`)
			.addField(`Your user Tag`, `<@${interaction.user.id}>`, true)
			.addField(`Your user ID`, `${interaction.user.id}`, true)
			.addField('\u200B', '\u200B', true)
			.addField('Joined Discord', `${new Date(interaction.user.createdTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(interaction.user.createdTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
			.addField('Joined server', `${new Date(member.joinedTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(member.joinedTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
			.addField('\u200B', '\u200B', true)
			.setThumbnail(interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setColor(Color)
			.setTimestamp();
		
		if(!user){
			return interaction.reply({ embeds: [userEmbed] });
		}
		if(user && member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)){
			member = interaction.guild.members.cache.get(user.id);
			const targetEmbed = new MessageEmbed()
				.setTitle(`🔎 ${user.username}'s Info`)
				.addField(`User Tag`, `<@${user.id}>`, true)
				.addField(`User ID`, `${user.id}`, true)
				.addField('\u200B', '\u200B', true)
				.addField('Joined Discord', `${new Date(user.createdTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(user.createdTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
				.addField('Joined server', `${new Date(member.joinedTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(member.joinedTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
				.addField('\u200B', '\u200B', true)
				.setThumbnail(user.displayAvatarURL({ size: 1024, dynamic: true}))
				.setColor(Color)
				.setTimestamp();
			return interaction.reply({ embeds: [targetEmbed] });
		}
		return interaction.reply({ content: 'Oh no no! :disappointed:\nYou are not allowed to use this slash command!', ephemeral: true });
	},
};