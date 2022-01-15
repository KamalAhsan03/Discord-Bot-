module.exports = {
    name: 'removerole',
    descrpition: 'Removes a Role!',
    minArgs: 4,
    expectedArgs: "<Target user's @> <The role name >",
    permissions: "Admin",
    execute(msg, args, Discord) {
        const targetUser = msg.mentions.users.first();
        if (!targetUser) {
            msg.reply('Who do you want to give the role to?');
            return;
        }

        args.shift();

        const roleName = args.join(' ');
        const {
            guild
        } = msg

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })

        if (!role) {
            msg.reply(`${roleName} role doesn't exist g. :gun: `)
            return;
        }

        const member = guild.members.cache.get(targetUser.id);

        if (msg.member.permissions.has("MANAGE_ROLES")) {
            if (member.roles.cache.get(role.id)) {
                member.roles.remove(role);
                msg.react('\⚔️');
                msg.channel.send(`The Goon ${targetUser} lost his ${roleName} rights :crossed_swords: :gun:`);
            } else {
                msg.react('\🔫')
                msg.channel.send(`The Homie ${targetUser} does not have ${roleName} role cuz.`);
            }
        } else {
            msg.react('\🔫')
            msg.reply("This is treason, can't snake roles goon :angry: :gun:");
        }

    }

}