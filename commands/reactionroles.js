const {
    MessageReaction
} = require("discord.js");
module.exports = {
    name: 'reactionroles',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '662102454720004112';
        const halfBreedsRole = message.guild.roles.cache.find(role => role.name === "UofT Bots");
        const stalwartsRole = message.guild.roles.cache.find(role => role.name === "Ryerson Bots");
        const seegRole = message.guild.roles.cache.find(role => role.name === "Siege");
        const valRole = message.guild.roles.cache.find(role => role.name === "Val");
        const warFrameRole = message.guild.roles.cache.find(role => role.name === "Warframe");


        const halfBreedsEmoji = '👺';
        const stalwartsEmoji = '📖';
        const seegEmoji = '🔫';
        const valEmoji = '🔺';
        const warFrameEmoji = '👽';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose ROLES :100: :fire: :pray: :flag_sa: ')
            .setDescription('Choose your roles (Do NOT LIE :gun: :crossed_swords:!)\n\n' +
                `${halfBreedsEmoji} if you're going to UofT\n` +
                `${stalwartsEmoji} if you're going to Ryerson\n` +
                `${seegEmoji} if you play R6 and would like to be notified to play R6 (UPDATES TOO!!!) :fire: :100: \n` +
                `${valEmoji} if you play Valorant and would like to notified to play Val (UPDATES TOO!!!) :fire: :100:\n` +
                `${warFrameEmoji} if you play Warframe(same idea as the other game roles :100:)`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(halfBreedsEmoji);
        messageEmbed.react(stalwartsEmoji);
        messageEmbed.react(seegEmoji);
        messageEmbed.react(valEmoji);
        messageEmbed.react(warFrameEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === halfBreedsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(halfBreedsRole);
                    console.log('Adding Half Breeds')
                }
                if (reaction.emoji.name === stalwartsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(stalwartsRole);
                    console.log('Adding Stalwarts')
                }
                if (reaction.emoji.name === seegEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(seegRole);
                    console.log('Adding Siege')
                }
                if (reaction.emoji.name === valEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(valRole);
                    console.log('Adding Val')
                }
                if (reaction.emoji.name === warFrameEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(warFrameRole);
                    console.log('Adding Warframe')
                }

            } else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === halfBreedsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(halfBreedsRole);
                }
                if (reaction.emoji.name === stalwartsEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(stalwartsRole);
                }
                if (reaction.emoji.name === seegEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(seegRole);
                }
                if (reaction.emoji.name === valEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(valRole);
                }
                if (reaction.emoji.name === warFrameEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(warFrameRole);
                }
            } else {
                return;
            }
        });
    }

}