module.exports = {
    name: 'ban',
    descrpition: 'Bans User Command!',
    execute(msg, args) {
        let targetMember = msg.mentions.users.first();
        if (targetMember) {
            let traitor = msg.guild.members.cache.get(targetMember.id);
            traitor.ban();
            msg.channel.send(`${targetMember} has been successfully banished :pray: :gun: :crossed_swords: :flag_sa:`);
            msg.react('\🔫');
            msg.react('\🙏');
            msg.react('\⚔️');
        } else {
            msg.reply('Pleace Specifcy the traitor :pray:');
            msg.react('\🔫');
            msg.react('\🙏');
        }
    }
}