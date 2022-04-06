const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { Color, ChannelsToPost, PlatformEmoji, SnowflakesRole, AboutYouChannel, ColorRoles, ColorEmoji } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Commands only available to admin.')
        .addStringOption(option => 
            option.setName('command')
            .setDescription('Command.')
            .setRequired(true)),
    
	async execute(client, interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const command = interaction.options.getString('command');

        if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            if(command === 'welcome'){
                const welcomeEmbed = new MessageEmbed()
                    .setTitle(`**Welcome to ${interaction.guild.name}!**`)
                    .setDescription(`**Ready to become a <@&${SnowflakesRole}> !?\nClick on ❄️ SNOWFLAKES.**\n**Tell more <#${AboutYouChannel}> !**`)
                    /* .setImage('https://i.imgur.com/PQUJw8q.gif') */
                    .setColor(Color);
                
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('snowflakes')
                        .setLabel('SNOWFLAKES')
                        .setEmoji('❄️')
                        .setStyle('PRIMARY')
                );
                replyLog(client, interaction, command);
                return interaction.channel.send({ embeds: [welcomeEmbed], components: [buttons] });
                
            }else if(command === 'platform roles'){
                const platformEmbed = new MessageEmbed()
                    .setDescription(`**What are your gaming platforms, <@&${SnowflakesRole}> ?**`)
                    .setColor(Color);
                
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('pc').setLabel('PC').setEmoji(PlatformEmoji[0]).setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('nintendo').setLabel('NINTENDO').setEmoji(PlatformEmoji[1]).setStyle('DANGER'),
                    new MessageButton()
                        .setCustomId('xbox').setLabel('XBOX').setEmoji(PlatformEmoji[2]).setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('playstation').setLabel('PLAYSTATION').setEmoji(PlatformEmoji[3]).setStyle('PRIMARY')
                );
                replyLog(client, interaction, command);
                return interaction.channel.send({ embeds: [platformEmbed], components: [buttons] });
            
            }else if(command === 'color roles'){
                const colorEmbed = new MessageEmbed()
                    .setDescription(`**Choose a color you like\nfor a different look from your nickname.**`)
                    /* .setImage('https://i.imgur.com/8auLWIt.gif') */
                    .setColor(Color);
                
                const rowButtons1 = new MessageActionRow().addComponents(
                    new MessageButton() /* pink */
                        .setCustomId(ColorRoles[0]).setEmoji(ColorEmoji[0]).setStyle('SECONDARY'),
                    new MessageButton() /* white */
                        .setCustomId(ColorRoles[1]).setEmoji(ColorEmoji[1]).setStyle('SECONDARY'),
                    new MessageButton() /* black */
                        .setCustomId(ColorRoles[2]).setEmoji(ColorEmoji[2]).setStyle('SECONDARY'),
                    new MessageButton() /* purple */
                        .setCustomId(ColorRoles[3]).setEmoji(ColorEmoji[3]).setStyle('SECONDARY')
                );
                const rowButtons2 = new MessageActionRow().addComponents(
                    new MessageButton() /* green */
                        .setCustomId(ColorRoles[5]).setEmoji(ColorEmoji[5]).setStyle('SECONDARY'),
                    new MessageButton() /* yellow */
                        .setCustomId(ColorRoles[6]).setEmoji(ColorEmoji[6]).setStyle('SECONDARY'),
                    new MessageButton() /* orange */
                        .setCustomId(ColorRoles[7]).setEmoji(ColorEmoji[7]).setStyle('SECONDARY'),
                    new MessageButton() /* red */
                        .setCustomId(ColorRoles[8]).setEmoji(ColorEmoji[8]).setStyle('SECONDARY')
                );
                replyLog(client, interaction, command);
                return interaction.channel.send({ embeds: [colorEmbed],  components: [rowButtons1, rowButtons2] });
            }

            client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\n<@${interaction.user.id}> tried to do this command: ${command}\n\`\`\``);
            return interaction.reply({ content: 'Command unavailable!', ephemeral: true });
        }else{
            return interaction.reply({ content: 'You are not allowed to do this command', ephemeral: true });
        }
	},
};

function replyLog(client, interaction, command){
    client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\n<@${interaction.user.id}> used the command: ${command}\n\`\`\``);
    interaction.reply({ content: `\`${command}\` command has been deployed!`, ephemeral: true });
}