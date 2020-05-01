const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOpt = { seek: 0, volume: 1 };
const token = 'NzA1NTQyNDQ2MTA4NjM5MjUy.XqtPEw.raqwcG1E6EAWipZIDaV4cAqYog4';

bot.login(token);

bot.on('ready', () => {
    console.log('it works')
})

bot.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.content.toLowerCase().startsWith('?elise')) {
        console.log('i read this')

        let content = msg.content;
        let newcontent = content.split(' ');

        console.log(newcontent)

        let voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return false;

        if (newcontent[1] == 'stop') { voiceChannel.leave() }

        voiceChannel.join().then(conn => {
            console.log('connected')
            const stream = ytdl(newcontent[1], { filter: 'audioonly' });

            const player = conn.play(stream)

            player.on('start', () => {
                console.log('startou')
            })
            player.on('end', () => {
                voiceChannel.leave();
            })
        }).catch(console.error);
    }
})