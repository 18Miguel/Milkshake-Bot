const { MessageEmbed } = require('discord.js');
const { guildID, Color, ChannelsToPost } = require('../config.json');

async function CheckBirthday(client, BirthdayData){

    const currentDate = new Date();

    if(currentDate.getHours() == 0 && currentDate.getMinutes() == 0){

        const Image = ["https://marisamcconnell.files.wordpress.com/2018/01/1.gif",
            "https://i.imgur.com/5MjQGgp.gif",
            "https://thumbs.gfycat.com/EmotionalGlamorousButterfly-max-1mb.gif",
            "https://www.myenglishteacher.eu/blog/wp-content/uploads/2021/05/happy-birthday.jpeg"];
        
        const tomorrow = new Date();
        const yesterday = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        yesterday.setDate(yesterday.getDate()-1);
        
        for(let i = 0; i < (BirthdayData.UserID).length; i++){
            const guild = client.guilds.cache.get(guildID);
            const BirthdayUser = await guild.members.fetch(BirthdayData.UserID[i]);
            const BirthdayRole = await guild.roles.fetch(BirthdayData.BirthdayRole);
            const randomNumber = Math.floor(Math.random() * (Image.length));
            const BirthdayEmbed = new MessageEmbed()
                .setTitle(`🎉 Happy Birthday!`)
                .setDescription(`**Wishes <@${BirthdayUser.id}> a happy birthday!**`)
                .setThumbnail(BirthdayUser.displayAvatarURL({ size: 1024, dynamic: true}))
                .setImage(Image[randomNumber])
                .setColor(Color)
                .setTimestamp();

            if(!BirthdayUser.roles.cache.has(BirthdayData.BirthdayRole)){
                if(currentDate.getDate() == BirthdayData.Day[i] && currentDate.getMonth()+1 == BirthdayData.Month[i]){
                    try{
                        if(!BirthdayUser){
                            console.log(`I can\'t find BirthdayUser with UserID.`);
                            sendLog(client, 'Can\'t find BirthdayUser with UserID.');
                        }else if(!BirthdayRole){
                            console.log(`I can\'t find role BirthdayRole.`);
                            sendLog(client, 'I can\'t find role BirthdayRole.');
                        }
                        BirthdayUser.roles.add(BirthdayRole);
                        client.channels.cache.get(ChannelsToPost[3]).send({ embeds: [BirthdayEmbed] });
                        sendLog(client, `I added the birthday role to <@${BirthdayData.UserID[i]}>.`);
                    }catch(error){
                        console.log(error);
                        sendLog(client, `⚠ Birthday System!\n${error}`);
                    }
                
                }else if(currentDate.getDate() == 28 && currentDate.getMonth()+1 == 2 && tomorrow.getDate() == 1 && tomorrow.getMonth()+1 == 3){
                    
                    if(BirthdayData.Day[i] == '29' && BirthdayData.Month[i] == '02'){
                        try{
                            if(!BirthdayUser){
                                console.log(`I can\'t find BirthdayUser with UserID.`);
                                sendLog(client, 'Can\'t find BirthdayUser with UserID.');
                            }else if(!BirthdayRole){
                                console.log(`I can\'t find role BirthdayRole.`);
                                sendLog(client, 'I can\'t find role BirthdayRole.');
                            }
                            BirthdayUser.roles.add(BirthdayRole);
                            client.channels.cache.get(ChannelsToPost[3]).send({ embeds: [BirthdayEmbed] });
                            sendLog(client, `I added the birthday role to <@${BirthdayData.UserID[i]}>.`);
                        }catch(error){
                            console.log(error);
                            sendLog(client, `⚠ Birthday System!\n${error}`);
                        }
                    }
                }

            }else if(BirthdayData.Day[i] == '29' && BirthdayData.Month[i] == '02' && ( (currentDate.getDate() == 28 && currentDate.getMonth()+1 == 2) || (currentDate.getDate() == 1 && currentDate.getMonth()+1 == 3 && yesterday.getDate() == 28) )){
                sendLog(client, `This user <@${BirthdayData.UserID[i]}> will have the birthday role for one more day.`);
            
            /* if the user has a birthday role */
            }else if(currentDate.getDate() != BirthdayData.Day[i]){
                BirthdayUser.roles.remove(BirthdayRole);
                sendLog(client, `I removed the birthday role to <@${BirthdayData.UserID[i]}>.`);
            }
        }
    }
}

function sendLog(client, string){
	client.channels.cache.get(ChannelsToPost[6]).send(`\`\`\`js\n${new Date().toLocaleString()}\n${string}\n\`\`\``);
}


module.exports = { CheckBirthday };

        /* const currentDate = new Date();
		if(currentDate.getHours() == 00 && currentDate.getMinutes() == 00){
			let tomorrowDate = currentDate;
			tomorrowDate.setDate(tomorrowDate.getDate()+1);
			const BirthdayData = loadJSON('./birthday-data/birthdata.json');
			const Image = ["https://marisamcconnell.files.wordpress.com/2018/01/1.gif",
							"https://i.imgur.com/5MjQGgp.gif",
							"https://thumbs.gfycat.com/EmotionalGlamorousButterfly-max-1mb.gif",
							"https://www.myenglishteacher.eu/blog/wp-content/uploads/2021/05/happy-birthday.jpeg"];
			for(let i = 0; i < (BirthdayData.UserID).length; i++){
				const guild = client.guilds.cache.get(guildID);
				const BirthdayUser = await guild.members.fetch(BirthdayData.UserID[i]);
				const BirthdayRole = await guild.roles.fetch(BirthdayData.BirthdayRole);
				const randomNumber = Math.floor(Math.random() * (Image.length));
				const BirthdayEmbed = new MessageEmbed()
					.setTitle(`🎉 Happy Birthday!`)
					.setDescription(`Wishes <@${BirthdayUser.id}> a happy birthday!`)
					.setThumbnail(BirthdayUser.displayAvatarURL({ size: 1024, dynamic: true}))
					.setImage(Image[randomNumber])
					.setColor(Color)
					.setTimestamp();

				if(!BirthdayUser.roles.cache.has(BirthdayData.BirthdayRole)){
					if(currentDate.getDate() == BirthdayData.Day[i] && currentDate.getMonth()+1 == BirthdayData.Month[i]){
						try{
							if(!BirthdayUser){
								console.log(`I can\'t find BirthdayUser with UserID.`);
								sendLog('Can\'t find BirthdayUser with UserID.');
							}else if(!BirthdayRole){
								console.log(`I can\'t find role BirthdayRole.`);
								sendLog('I can\'t find role BirthdayRole.');
							}
							BirthdayUser.roles.add(BirthdayRole);
							client.channels.cache.get(ChannelsToPost[3]).send({ embeds: [BirthdayEmbed] });
							sendLog(`I added the birthday role to <@${BirthdayData.UserID[i]}>.`);
						}catch(error){
							console.log(error);
							sendLog(`⚠ Birthday System!\n${error}`);
						}
					
					}else if(currentDate.getDate() == 28 && currentDate.getMonth()+1 == 2 && tomorrowDate.getDate() == 1 && tomorrowDate.getMonth()+1 == 3){
						if(BirthdayData.Day[i] == '29' && BirthdayData.Month[i] == '02'){
							try{
								if(!BirthdayUser){
									console.log(`I can\'t find BirthdayUser with UserID.`);
									sendLog('Can\'t find BirthdayUser with UserID.');
								}else if(!BirthdayRole){
									console.log(`I can\'t find role BirthdayRole.`);
									sendLog('I can\'t find role BirthdayRole.');
								}
								BirthdayUser.roles.add(BirthdayRole);
								client.channels.cache.get(ChannelsToPost[3]).send({ embeds: [BirthdayEmbed] });
								sendLog(`I added the birthday role to <@${BirthdayData.UserID[i]}>.`);
							}catch(error){
								console.log(error);
								sendLog(`⚠ Birthday System!\n${error}`);
							}
						}
					}
				}else if(currentDate.getDate() != BirthdayData.Day[i]){
					BirthdayUser.roles.remove(BirthdayRole);
					sendLog(`I removed the birthday role to <@${BirthdayData.UserID[i]}>.`);
				}
			}
		} */