module.exports = {
    name: 'info',
    descrpition: 'User Info Embeds!',
    execute(msg, args, Discord) {
        let newEmbed = new Discord.MessageEmbed()
            .setColor('0x21FFCB')
            .setTitle('User Info')
            .addField("User's Name", msg.author.username, true)
            .addField('Server', msg.guild.name)
            .setThumbnail(msg.author.avatarURL())
            .setFooter('User ID: ' + msg.author.id)
        msg.channel.send(newEmbed);

    }
}