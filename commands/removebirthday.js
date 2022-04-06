const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadJSON, saveJSON, isValidDate } = require('../birthday-data');
const { BirthdayRole } = require('../birthday-data/birthdata.json');
const { ChannelsToPost } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-birthday')
		.setDescription('Remove your birthday.'),
    
	async execute(client, interaction){
        const FileJSON = './birthday-data/birthdata.json';
        const BrithData = loadJSON(FileJSON);
        const user = interaction.guild.members.cache.get(interaction.user.id);
        const hasRole = user.roles.cache.has(BirthdayRole);

        /* Check if the birthday is already set */
        for(let i = 0; i < (BrithData.UserID).length; i++){
            if(BrithData.UserID[i] == interaction.user.id){
                BrithData.UserID.splice(i, 1);
                BrithData.Day.splice(i, 1);
                BrithData.Month.splice(i, 1);
                saveJSON(FileJSON, BrithData);

                if(hasRole){
                    user.roles.remove(BirthdayRole);
                    client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\nI removed the birthday and BirthdayRole from user <@${interaction.user.id}>.\n\`\`\``);
                    return interaction.reply({ content: 'Your birth date has been removed.', ephemeral: true });
                }
                client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\nI removed the birthday from user <@${interaction.user.id}>.\n\`\`\``);
                return interaction.reply({ content: 'Your birth date has been removed.', ephemeral: true });
            }
        }
        return interaction.reply({ content: 'I don\'t have your birthday among my ingredients! :confused:', ephemeral: true });
	},
};