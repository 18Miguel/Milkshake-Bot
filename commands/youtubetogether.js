const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');
const { Color, guildID } = require('../config.json');
const { DiscordTogether } = require('discord-together');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube-together')
        .setDescription('📽 Play a \"Youtube\" on Discord!'),
    
	async execute(client, interaction) {
        const Guild = client.guilds.cache.get(guildID);
        const Member = Guild.members.cache.get(interaction.user.id);
        client.discordTogether = new DiscordTogether(client);
        if(Member.voice.channel){ /* if(interaction.member.voice.channel){ */
        /* client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtubedev').then(async invite => { */
        client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                const youtubeEmbed = new MessageEmbed()
                    .setTitle("📽 YouTube Together")
                    .setThumbnail("https://cdn.dribbble.com/users/1369921/screenshots/3699553/yt-new-button-yoodle.gif")
                    .setDescription(`Enjoy and Share moments with your friends!\n[Watch](${invite.code})`)
                    .setColor(Color);
                
                return interaction.reply({ embeds: [youtubeEmbed] });
            });
        }else{
            return interaction.reply({ content: 'You should be in a Voice Channel!', ephemeral: true });
        }
    },
};