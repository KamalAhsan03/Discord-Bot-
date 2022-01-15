module.exports = {
    name: 'unmute',
    descrpition: 'Unmutes User Command!',
    execute(msg, args) {
        let targetMember = msg.mentions.users.first();
        if (targetMember) {
            let mainRole = msg.guild.roles.cache.find(role => role.name === '🅱ruh');
            let muteRole = msg.guild.roles.cache.find(role => role.name === 'Habeas Corpus');
            let bigRole = msg.guild.roles.cache.find(role => role.name === 'Chad')

            let muteMember = msg.guild.members.cache.get(targetMember.id);

            muteMember.roles.add(mainRole.id);
            muteMember.roles.add(bigRole);
            muteMember.roles.remove(muteRole.id);

            msg.channel.send(`${targetMember}'s Free Speech has been given back :pray: :fire:`);
            msg.react('\🙏');
            msg.react('\🔈');
        } else {
            msg.reply("Pleace Specifcy whose freedom of speech you're blessing :pray:");
            msg.react('\🔫');
            msg.react('\🙏');
            msg.react('\🔈');
        }
    }
}