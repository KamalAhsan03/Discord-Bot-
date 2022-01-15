const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    description: 'Music bot',
    async execute(msg, args, command) {


        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.channel.send('Join voice channel to play some tunes :gun:');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) return msg.channel.send("You don't have the rights :gun: :crossed_swords:");
        if (!permissions.has('SPEAK')) return msg.channel.send("You don't have the rights :gun: :crossed_swords:");

        const serverQueue = queue.get(msg.guild.id);

        if (command === 'play') {
            msg.react('🎶')
            if (!args.length) return msg.channel.send('You need a song! :gun: :notes:');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url
                }
            } else {
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url
                    }
                } else {
                    msg.channel.send("Error finding the song video");
                }
            }

            if (!serverQueue) {

                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: msg.channel,
                    connection: null,
                    songs: []
                }

                queue.set(msg.guild.id, queueConstructor);
                queueConstructor.songs.push(song);


                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    video_player(msg.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(msg.guild.id);
                    msg.channel.send('There was an error connecting!');
                    throw err;
                }
            } else {
                serverQueue.songs.push(song);
                return msg.channel.send(`:100: **${song.title}** added to queue! :pray: :notes:`);
            }
        } else if (command === 'skip') {
            skip_song(msg, serverQueue)
            msg.react('▶️');
        } else if (command === 'stop') {
            stop_song(msg, serverQueue)
            msg.react('️️🖐️') && msg.react('🛑');
        }
    }

}

const video_player = async (guild, song) => {
    const songQueue = queue.get(guild.id);


    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {
        filter: 'audioonly'
    });
    songQueue.connection.play(stream, {
            seek: 0,
            volume: 0.5
        })
        .on('finish', () => {
            songQueue.songs.shift();
            video_player(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (msg, serverQueue) => {
    if (!msg.member.voice.channel) return msg.channel.send('Join a voice channel to execute this command! :gun: :crossed_swords:');
    if (!serverQueue) {
        return msg.channel.send(`There are no songs in queue 😔 :gun: :angry: :crossed_swords:`);
    }
    serverQueue.connection.dispatcher.end();
}

const stop_song = (msg, serverQueue) => {
    if (!msg.member.voice.channel) return msg.channel.send('Join a voice channel to execute this command! :gun: :crossed_swords:');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}