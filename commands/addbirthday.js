const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadJSON, saveJSON, isValidDate } = require('../birthday-data');
const { ChannelsToPost } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-birthday')
		.setDescription('Add your birthday.')
        .addIntegerOption(option => 
            option.setName('day')
            .setDescription('The day of your birthday.')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('month')
            .setDescription('The month of your birthday.')
            .setRequired(true)),
    
	async execute(client, interaction){
        const FileJSON = './birthday-data/birthdata.json';
        const day = (interaction.options.getInteger('day')).toString().padStart(2, '0');
        const month = (interaction.options.getInteger('month')).toString().padStart(2, '0');
        const BrithData = loadJSON(FileJSON);

        /* Check if the birthday is already set */
        for(let i = 0; i < (BrithData.UserID).length; i++){
            if(BrithData.UserID[i] == interaction.user.id){
                return interaction.reply({ content: 'You have already set your birthday.', ephemeral: true });
            }
        }
        
        if(isValidDate(`${day}/${month}/2000`)){
            BrithData.UserID.push(`${interaction.user.id}`);
            BrithData.Day.push(`${day}`);
            BrithData.Month.push(`${month}`);
            saveJSON(FileJSON, BrithData);

            client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\nI added the user\'s birthday <@${interaction.user.id}>.\n\`\`\``);
            return interaction.reply({ content: `Your birthday was been set to this date \`${day}/${month}\``, ephemeral: true});
        }else{
            return interaction.reply({ content: 'Please enter a valid date.', ephemeral: true });
        }
	},
};