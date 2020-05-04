const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOpt = { seek: 0, volume: 1 };
const token = 'NzA1NTQyNDQ2MTA4NjM5MjUy.XqxzJA.Xz4B4A_DBpwtKDDDwTwReBzv_sg';


bot.login(token);

bot.on('ready', () => {
    console.log('it works')
})

bot.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.content.toLowerCase().startsWith('?elise')) {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return false;

        let content = msg.content;
        let newcontent = content.split(' ');

        if (newcontent[1] == 'stop') { voiceChannel.leave() }
        if (newcontent[1].toString().startsWith('http')) {
            voiceChannel.join().then(conn => {
                const stream = ytdl(newcontent[1], { filter: 'audioonly' });
                const player = conn.play(stream, streamOpt)

                player.on('end', () => {
                    voiceChannel.leave();
                })

            }).catch(console.error);
        }
    }
})
