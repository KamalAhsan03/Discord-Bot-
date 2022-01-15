const ms = require('ms');
module.exports = {
    name: 'mute',
    descrpition: 'Mute User Command!',
    execute(msg, args) {
        let targetMember = msg.mentions.users.first();
        if (targetMember) {
            let mainRole = msg.guild.roles.cache.find(role => role.name === '🅱ruh');
            let muteRole = msg.guild.roles.cache.find(role => role.name === 'Habeas Corpus');
            let bigRole = msg.guild.roles.cache.find(role => role.name === 'Chad')

            let muteMember = msg.guild.members.cache.get(targetMember.id);

            if (!args[1]) {
                muteMember.roles.remove(mainRole.id);
                muteMember.roles.add(muteRole.id);
                msg.channel.send(`${targetMember}'s Free Speech has been taken away :pray: :flag_sa: :fire:`);
                msg.react('\🔫');
                msg.react('\🙏');
                msg.react('\😶');
                return;
            }

            muteMember.roles.remove(mainRole.id);
            muteMember.roles.add(muteRole.id);
            msg.channel.send(`${targetMember}'s Free Speech has been taken away for ${ms(ms(args[1]))}:pray: :flag_sa: :fire:`);
            msg.react('\🔫');
            msg.react('\🙏');
            msg.react('\😶');

            setTimeout(function () {
                muteMember.roles.add(mainRole.id);
                muteMember.roles.remove(muteRole.id);
                msg.channel.send(`${targetMember}'s Free Speech has been given back :pray: :fire:`);
                msg.react('\🙏');
                msg.react('\🔈');
            }, ms(args[1]));
        } else {
            msg.reply("Pleace Specifcy whose freedom of speech you're finessing :pray:");
            msg.react('\🔫');
            msg.react('\🙏');
            msg.react('\😶');
        }
    }
}