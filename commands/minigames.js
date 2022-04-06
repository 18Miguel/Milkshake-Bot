const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Color } = require('../config.json');
const Discord = require('discord.js');
const { DiscordTogether } = require('discord-together');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("minigames")
        .setDescription("🎮 Play and Enjoy activities in Voice Chat with friends!")
        .addSubcommand(subCommand =>
            subCommand
                .setName("chess")
                .setDescription("♟ Play chess with friends!")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("checkers")
                .setDescription("Play checkers with friends!")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("betrayal")
                .setDescription("Who\'s the betrayer? let\'s see!")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("poker")
                .setDescription("♣ Let\'s see how your money gone from your wallet.")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("fishing")
                .setDescription("🐟 Catch that big fish to your lunch!")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("lettertile")
                .setDescription("Let's build words!")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("wordsnack")
                .setDescription("Your Picnic with Words.")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("doodlecrew")
                .setDescription("Do your best doodles so they can guess.")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("spellcast")
                .setDescription("Spell Cast")
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("puttparty")
                .setDescription("Putt Party")
        ),
    
    async execute(client, interaction) {
        
        client.discordTogether = new DiscordTogether(client);
        
        let userChannel = interaction.member.voice.channel;
        if(!userChannel)
            return interaction.reply('You should be in a Voice Channel!');

        const choice = interaction.options.getSubcommand();

        if(choice === "chess"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
                const chessEmbed = new MessageEmbed()
                    .setTitle("♟ Chess")
                    .setThumbnail("https://miro.medium.com/max/1400/1*s4VuU-ZAlgCcg3Yw4RvKJQ.gif")
                    .setDescription(`Enjoy and Share moments with your friends!\n[Watch](${invite.code})`)
                    .setColor(Color);
                
                return interaction.reply({ embeds: [chessEmbed] });
            })
        }else if(choice === "checkers"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'checkers').then(async invite => {
                const checkersEmbed = new MessageEmbed()
                    .setTitle("checkers")
                    .setThumbnail("https://i.makeagif.com/media/2-09-2019/O2mfHi.gif")
                    .setDescription(`Play as a normal member or a betrayer!\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [checkersEmbed] });
            })
        }else if(choice === "betrayal"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'betrayal').then(async invite => {
                const betrayalEmbed = new MessageEmbed()
                    .setTitle("Betrayal")
                    .setThumbnail("https://media.giphy.com/media/o3OudM1EkO9SiAzo9V/giphy.gif")
                    .setDescription(`Play as a normal member or a betrayer!\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [betrayalEmbed] });
            })
        }else if(choice === "poker"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
                const pokerEmbed = new MessageEmbed()
                    .setTitle("♣ Poker")
                    .setThumbnail("https://media.giphy.com/media/7Mvm1bmTPXnwLcHONE/giphy.gif")
                    .setDescription(`Hmm, try to get the full house!\n[Of course.](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [pokerEmbed] });
            })
        }else if(choice === "fishing"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishing').then(async invite => {
                const fishingEmbed = new MessageEmbed()
                    .setTitle("🐟 Fishing")
                    .setThumbnail("https://media.giphy.com/media/osncBSthuV9fWCHg7B/giphy.gif")
                    .setDescription(`Anyone likes to catch the big fish?\n[Let\'s fish!](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [fishingEmbed] });
            })
        }else if(choice === "lettertile"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'lettertile').then(async invite => {
                const lettertileEmbed = new MessageEmbed()
                    .setTitle(":regional_indicator_m: :regional_indicator_s: Letter Tile")
                    .setThumbnail("https://assets.materialup.com/uploads/c5f4ae68-9549-4c74-855f-c865775406bd/preview.gif")
                    .setDescription(`Let's build words?\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [lettertileEmbed] });
            })
        }else if(choice === "wordsnack"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'wordsnack').then(async invite => {
                const wordsnackEmbed = new MessageEmbed()
                    .setTitle("🍱 Word Snack")
                    .setThumbnail("https://media4.giphy.com/media/jWDngqGu1MsXFMT1PI/giphy.gif")
                    .setDescription(`Let's build words?\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [wordsnackEmbed] });
            })
        }else if(choice === "doodlecrew"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'doodlecrew').then(async invite => {
                const doodlecrewEmbed = new MessageEmbed()
                    .setTitle("🖋 Doodle Crew")
                    .setThumbnail("https://pbs.twimg.com/profile_images/1352663805478711302/3T9dxy9m_400x400.jpg")
                    .setDescription(`Do your best doodles. Can your crew guess?\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [doodlecrewEmbed] });
            })
        }else if(choice === "spellcast"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'spellcast').then(async invite => {
                const spellcastEmbed = new MessageEmbed()
                    .setTitle("Spell Cast")
                    /* .setThumbnail("") */
                    .setDescription(`\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [spellcastEmbed] });
            })
        }else if(choice === "puttparty"){
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'puttparty').then(async invite => {
                const puttpartyEmbed = new MessageEmbed()
                    .setTitle("Puttp Party")
                    /* .setThumbnail("") */
                    .setDescription(`\n[Play](${invite.code})`)
                    .setColor(Color);

                return interaction.reply({ embeds: [puttpartyEmbed] });
            })
        }
    }
}