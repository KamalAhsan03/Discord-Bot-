module.exports = {
    name: 'kick',
    descrpition: 'Kicks User Command!',
    execute(msg, args) {
        let targetMember = msg.mentions.users.first();
        if (targetMember) {
            let deportee = msg.guild.members.cache.get(targetMember.id);
            deportee.kick();
            msg.channel.send(`${targetMember} has been successfully deported :pray: :gun: :crossed_swords: :flag_sa:`);
            msg.react('\🔫');
            msg.react('\🙏');
            msg.react('\⚔️');
        } else {
            msg.reply('Pleace Specifcy the Deportee :pray:');
            msg.react('\🔫');
            msg.react('\🙏');
        }
    }
}