module.exports = {
    name: 'ping',
    descrpition: 'Ping Command!',
    execute(msg, args) {

        if (msg.member.roles.cache.has('662705068050612261')) {
            msg.react('\🙏');
            msg.channel.send("What's good homes whatchu need g :pray:");
        } else {
            msg.react('\🔫')
            msg.channel.send('Nah, you not worthy :gun: \nGet role using $giverole command');
        }

    }

}