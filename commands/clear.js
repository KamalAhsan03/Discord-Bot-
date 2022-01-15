module.exports = {
    name: 'clear',
    descrpition: 'Clear Command!',
    async execute(msg, args) {
        if (!args[0]) return msg.reply('Specify how many insider deals you want to finesse cuz :100: :pray: ');
        if (isNaN(args[0])) return msg.reply('Allow numbers in numerals g :pray: :gun:');

        if (args[0] > 100) return msg.reply('The homie tryna delete all the secrets chill with the treason use less than 100 cuz :pray: :gun: :crossed_swords:');
        if (args[0] < 1) return msg.reply('Gotta delete some secrets homes :gun: :pray: ');

        await msg.channel.messages.fetch({
            limit: args[0]
        }).then(messages => {
            msg.channel.bulkDelete(messages);
        })
    }

}