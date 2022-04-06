const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-channel')
		.setDescription('deletes up to 100 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete.')),
	async execute(client, interaction){
		const member = interaction.guild.members.cache.get(interaction.user.id);
		if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
			const amount = interaction.options.getInteger('amount');

			if(amount <= 1 || amount >= 101){
				return interaction.reply({ content: 'You need to input a number between 1 and 101.', ephemeral: true });
			}
			
			await interaction.channel.bulkDelete(amount, true).catch(error => {
				console.error(error);
				interaction.reply({ content: 'There was an error trying to remove messages in this channel!', ephemeral: true });
			});

			return interaction.reply({ content: `We successfully removed \`${amount}\` messages.`, ephemeral: true });
		}
		return interaction.reply({ content: 'Oh no no! :disappointed:\nYou are not allowed to use this slash command!', ephemeral: true });
	},
};