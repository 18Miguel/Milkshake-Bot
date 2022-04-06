const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { Token, TwitterConsumerKey, TwitterConsumerSecret, Color, TwitterAccessTokenKey,
	TwitterAccessTokenSecret, guildID, TwitterFollowing, ChannelsToPost, YouTubeChannelID,
	PlatformRoles, SnowflakesRole, ColorRoles } = require('./config.json');
const { loadJSON } = require('./birthday-data');
const { CheckBirthday } = require('./birthday-data/birthdaysystem');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,
					Intents.FLAGS.GUILD_MESSAGES,
					Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
					Intents.FLAGS.GUILD_MEMBERS] });
const Twitter = require('node-tweet-stream');
const YouTubeNotification = require('./youtube-notification');
const generateImage = require('./generate-image');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en', commandOptionName: 'user' });


/************** Set All Slashcommands Files **************/
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log('Files loaded..');
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	console.log(`✔ [${file}] have been loaded!`);
}

/******************** Set Twitter API ********************/
const SocialTwitter = new Twitter({
    consumer_key: TwitterConsumerKey,
    consumer_secret: TwitterConsumerSecret,
    token: TwitterAccessTokenKey,
    token_secret: TwitterAccessTokenSecret,
});

/************** Set Twitter Accounts To Follow **************/
let followedAccounts = TwitterFollowing;
console.log(' \nTwitter users loading..');
for(let i = 0; i < followedAccounts.length; i++){
    SocialTwitter.follow(followedAccounts[i]);
    console.log(`✔ Following Twitter UserID [${followedAccounts[i]}]`);
}

/**************** Set YouTube Notification *****************/
const SocialYouTube = new YouTubeNotification({
    channels: [YouTubeChannelID[0], YouTubeChannelID[1], YouTubeChannelID[2]],
			/* Nintendo, VALORANT, IGN */
    checkInterval: 60 /* Interval to check the latest video. */
});


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
/*%%%%%%%%%%%%%%%%%%%%%%%%%%% Milkshake Bot Code %%%%%%%%%%%%%%%%%%%%%%%%%%%*/
client.on('ready', async () => {
	const status = [
		"a tornado of flavors..\naahaaah!",
		"my body temperature.",
		`${client.guilds.cache.size} servers & ${client.users.cache.size} users!`
	];
	let randomNumber = 0;
	setInterval(() => {
        randomNumber = Math.floor(Math.random() * (status.length));
        client.user.setActivity(`${status[randomNumber]}`, { type: 'WATCHING' });
    }, 1000*60); /* 1000ms = 1s */
	/* client.user.setActivity('a tornado of flavors!', { type: 'WATCHING' }); */

	/************************ Birthday System ************************/
	setInterval(async () => {
		const BirthdayData = loadJSON('./birthday-data/birthdata.json');
		CheckBirthday(client, BirthdayData);
	}, 1000*45); /* 1000ms = 1s */

    console.log(`\n\n${client.user.username} is ready to taste!\n`);
	sendLog(`${client.user.username} is ready to taste!`);
});

/****************** Reconnecting client ******************/
client.on('reconnecting', () => {
    client.user.setActivity(`Reconnecting..`, { status: 'idle' });
	sendLog(`Reconnecting..`);
});

/************ Interaction With Slashcommands ************/
client.on('interactionCreate', async interaction => {
	if(interaction.isCommand()){

		if(interaction.commandName === 'tictactoe'){
			return game.handleInteraction(interaction);
		}

		const command = client.commands.get(interaction.commandName);
	
		if(!command) return;
		
		try{
			await command.execute(client, interaction);
		}catch(error){
			console.error(error);
			sendLog(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	if(interaction.isButton()){
		const user = interaction.guild.members.cache.get(interaction.user.id);

		if(interaction.customId === 'pc'){
			/* Add or Remove user role */
			const role = interaction.guild.roles.cache.get(PlatformRoles[0]);
			addRemoveRoles(user, interaction, role);

			/* Delete message reply */
			const message = await interaction.fetchReply();
			deleteReplyButton(interaction, message);
		
		}else if(interaction.customId === 'nintendo'){
			/* Add or Remove user role */
			const role = interaction.guild.roles.cache.get(PlatformRoles[1]);
			addRemoveRoles(user, interaction, role);

			/* Delete message reply */
			const message = await interaction.fetchReply();
			deleteReplyButton(interaction, message);
		
		}else if(interaction.customId === 'xbox'){
			/* Add or Remove user role */
			const role = interaction.guild.roles.cache.get(PlatformRoles[2]);
			addRemoveRoles(user, interaction, role);

			/* Delete message reply */
			const message = await interaction.fetchReply();
			deleteReplyButton(interaction, message);
		
		}else if(interaction.customId === 'playstation'){
			/* Add or Remove user role */
			const role = interaction.guild.roles.cache.get(PlatformRoles[3]);
			addRemoveRoles(user, interaction, role);

			/* Delete message reply */
			const message = await interaction.fetchReply();
			deleteReplyButton(interaction, message);
		
		}else if(interaction.customId === 'snowflakes'){
			/* Add or Remove user role */
			const role = interaction.guild.roles.cache.get(SnowflakesRole);
			addRemoveRoles(user, interaction, role);

			/* Delete message reply */
			const message = await interaction.fetchReply();
			deleteReplyButton(interaction, message);
		
		}else{
			for(let i = 0; i < ColorRoles.length; i++){
				if(interaction.customId === ColorRoles[i]){
					/* Add or Remove user role */
					let role = interaction.guild.roles.cache.get(ColorRoles[i]);
					addRemoveRoles(user, interaction, role);

					/* Remove other roles from the same group */
					for(let j = 0; j < ColorRoles.length; j++){
						if(user.roles.cache.has(ColorRoles[j]) && j != i){
							role = interaction.guild.roles.cache.get(ColorRoles[j]);
							user.roles.remove(ColorRoles[j]);
							const wait = require('node:timers/promises').setTimeout;
							await wait(1000);
							await interaction.editReply(`I removed you the ${role.name} role.`);
							sendLog(`I removed the ${role.name} Role from user <@${user.id}>.`);
						}
					}

					/* Delete message reply */
					let message = await interaction.fetchReply();
					deleteReplyButton(interaction, message);
				}
			}
		}
	}

	function addRemoveRoles(user, interactionButton, role){
		if(user.roles.cache.has(role.id)){
			user.roles.remove(role.id);
			interactionButton.reply(`I removed you the ${role.name} role.`);
			sendLog(`I removed the ${role.name} Role from user <@${user.id}>.`);
		}else{
			user.roles.add(role.id);
			interactionButton.reply(`I added you the ${role.name} role.`);
			sendLog(`I added the ${role.name} Role from user <@${user.id}>.`);
		}
	}

	function deleteReplyButton(interactionButton, message){
			setTimeout(() => {
				interactionButton.channel.messages.fetch(message.id)
					.then((msg) => {
						interactionButton.deleteReply(); /* console.log(msg); */
					})
					.catch((error) => {
						if(!error.httpStatus === 404)
							console.log(error);
					});
			}, 1000*2.5);
	}
});

/************** Sends A Welcome Image When A New User Joins The Server **************/
client.on('guildMemberAdd', async member => {
	const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
	const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
	const newMember = member.guild.members.cache.get(member.user.id);
	const newMemberEmbed = new MessageEmbed()
		.setTitle(`🔎 ${member.user.username} joined the server!`)
		.addField(`User Tag`, `<@${member.user.id}>`, true)
		.addField(`User ID`, `${member.user.id}`, true)
		.addField('\u200B', '\u200B', true)
		.addField('Joined Discord', `${new Date(member.user.createdTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(member.user.createdTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
		.addField('Joined server', `${new Date(newMember.joinedTimestamp).toLocaleDateString('en-us', optionsDate)}\n${new Date(newMember.joinedTimestamp).toLocaleTimeString('en-us', optionsTime)}`, true)
		.addField('\u200B', '\u200B', true)
		.setThumbnail(member.user.displayAvatarURL({ size: 1024, dynamic: true}))
		.setColor(Color)
		.setTimestamp();
	
	const welcomeImage = await generateImage(member, `${member.user.username} just joined the server`);
	
	client.channels.cache.get(ChannelsToPost[7]).send({
		embeds: [newMemberEmbed]
	});
	client.channels.cache.get(ChannelsToPost[0]).send({
		content: `Hey, <@${member.id}>, welcome to SnowMi's House ❄! <:1_Hi:866983162533773312>`,
		files: [welcomeImage]
	});
	sendLog(`${member.user.username} joined the server`);
});

/**************** Sends A Goodbye Image When A User Leaves The Server ****************/
client.on('guildMemberRemove', async member => {
	const randomMessages = [
		'Keep in touch!',
		'Goodbye always makes my throat hurt\nWaiit.. I\'m a bot!',
		'See you soon..'
	];
	const randomIndex = Math.floor(Math.random() * (randomMessages.length));
	const welcomeImage = await generateImage(member, `${member.user.username} just left the server, Bye! 🙁`);
	
	client.channels.cache.get(ChannelsToPost[0]).send({
		content: `${randomMessages[randomIndex]}`,
		files: [welcomeImage]
	});
	sendLog(`${member.user.username} left the server`);
});

/********* Send Tweets To The respective Channels *********/
SocialTwitter.on('tweet', function(tweet){
	/* console.log('Tweet received!', tweet); */
	/* console.log(`[DEBUG] Twitter - ${tweet.user.screen_name} ${tweet.user.id}`); */

	const tweetToSend = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

	/*** All tweets are sent to the [BOT-SPAM] channel [MILKSHAKE BOT Server] ***/
	let TwitterUsers = TwitterFollowing;
	for(let i = 0; i < TwitterFollowing.length; i++){
		if(tweet.user.id == TwitterUsers[i])
			client.channels.cache.get(ChannelsToPost[5]).send(tweetToSend);
	}
	
	/*** Tweets from [@PlayVALORANT] are sent to the [OTHER-GAMES] channel ***/
	if(tweet.user.id == TwitterFollowing[0]){
		client.channels.cache.get(ChannelsToPost[1]).send(tweetToSend);
	
	/*** Tweets from [@NintendoAmerica] & [@NintendoEurope] are sent to the [NINTENDO] channel ***/
	}else if(tweet.user.id == TwitterFollowing[1] || tweet.user.id == TwitterFollowing[2]){
		client.channels.cache.get(ChannelsToPost[2]).send(tweetToSend);
	}
});

/******************* Catch Twitter error *******************/
SocialTwitter.on('error', function (error) {
    console.log('⚠ SocialTwitter Down!', error);
	sendLog(`⚠ SocialTwitter Down!\n${error}`);
});

/********* Send Videos To The respective Channels *********/
SocialYouTube.on('video', video => {
    /* console.log(video); */
	const URLVideo = `https://youtu.be/${video.id}`;
	
	/* Videos from [VALORANT] are sent to the [OTHER-GAMES] channel */
	if(video.channelID === YouTubeChannelID[0]){
		client.channels.cache.get(ChannelsToPost[1]).send(URLVideo);
	
	/* Videos from [NINTENDO] are sent to the [NINTENDO] channel */
	}else if(video.channelID === YouTubeChannelID[1]){
		client.channels.cache.get(ChannelsToPost[2]).send(URLVideo);
	
	/* Videos from [IGN] are sent to the [MILKSHAKE] channel */
	}else if(video.channelID === YouTubeChannelID[2]){
		client.channels.cache.get(ChannelsToPost[5]).send(URLVideo);
	}
});

client.login(Token);


/* Send console.log messages to a log channel */
function sendLog(string){
	client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\n${string}\n\`\`\``);
}