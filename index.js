const {
    Client,
    MessageAttachment,
    Presence
} = require('discord.js');
const Discord = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

const memberCounter = require('./counters/member-counter');

const ytdl = require("ytdl-core");

// Implement Login Information 
const token = 'ODY4MTY1MDI2NDAwMzA1MjQ0.YPrrsA.DLcwq7s-Qo5vYBCGmJIAxOu3Gk0';

const PREFIX = '$';
const fs = require('fs');
client.commands = new Discord.Collection();
client.events = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

var version = '1.0.0'
var servers = {};

const onCoolDown = new Set();

client.once('ready', () => {
    console.log('This bot is ONLINE!');
    client.user.setActivity('The Crusades', {
        type: 'STREAMING'
    }).catch(console.error);
    memberCounter(Discord, client);
})

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '🅱ruh');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('685954996054917292')
        .send(`Welcome Welcome MTV Crips, It's <@${guildMember.user.id}>!`);
});
client.on('message', msg => {
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
    const args = msg.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (command === 'reactionroles') {
        client.commands.get('reactionroles').execute(msg, args, Discord, client);
    } else if (command === 'giverole') {
        client.commands.get('giverole').execute(msg, args);
    } else if (command === 'removerole') {
        client.commands.get('removerole').execute(msg, args);
    } else if (command === 'hasrole') {
        client.commands.get('hasrole').execute(msg, args);
    } else if (command === 'rules') {
        client.commands.get('rules').execute(msg, args, Discord);
    } else if (command === 'info') {
        client.commands.get('info').execute(msg, args, Discord);
    } else if (command === 'clear') {
        client.commands.get('clear').execute(msg, args);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(msg, args);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(msg, args);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(msg, args);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(msg, args);
    } else if (command === 'images') {
        client.commands.get('images').execute(msg, args)
    } else if (command === 'play' || 'skip' || 'stop') {
        client.commands.get('play').execute(msg, args, command);

    }

})

client.login(token);
