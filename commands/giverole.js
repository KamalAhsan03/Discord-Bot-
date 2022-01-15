module.exports = {
    name: 'giverole',
    descrpition: 'Gives a Role!',
    minArgs: 4,
    expectedArgs: "<Target user's @> <The role name >",
    permissions: "Admin",
    execute(msg, args) {
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
                msg.react('\🙏');
                msg.channel.send(`${targetUser} already has the ${roleName} rights :pray:`);
            } else {
                member.roles.add(role).catch(console.error);
                msg.react('\🙏');
                msg.channel.send(`${targetUser}, is now worthy of the ${roleName} rights :pray: `);
            }
        } else {
            msg.react('\🔫')
            msg.reply("This is treason, can't snake roles goon :angry: :gun:");
        }

    }

}
