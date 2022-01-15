module.exports = {
    name: 'rules',
    descrpition: 'Rules Embeds!',
    execute(msg, args, Discord) {
        let newEmbed = new Discord.MessageEmbed()
            .setColor('0x21FFCB')
            .setTitle('Rules')
            .addFields({
                name: 'Rule 1',
                value: "Don't be a dick :gun: :crossed_swords:"
            }, {
                name: 'Rule 2',
                value: 'Everyone is welcome :100: :pray: (unless ur a dick :gun:)'
            }, {
                name: 'Rule 3',
                value: 'Try not to curse :pray:'
            }, {
                name: 'Rule 4',
                value: 'Keep Politics to a minimum (LOL JK JUST DONT BE A DICK) :gun: :pray: :crossed_swords:'
            }, {
                name: 'Rule 5',
                value: 'Have a BLAST, ask any qs u got :100: :pray: '
            }, {
                name: 'Rule 5.2',
                value: 'DON HELLA SECXY :hot_face: :sweat: :hot_face: '
            })
            .setFooter("Stay safe :100:");
        msg.channel.send(newEmbed);
    }
}