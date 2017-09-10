exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    const rank = args[0];
    const skillGroups = [
        `css`, `html`, `affinityphoto`, `ruby`, `sql`, `c++`, `c#`, `swift`, `phyton`, `java`, `php`, `javascript`,
        `blender`, `cinema4d`, `gimp`, `photoshop`,
    ];

    if (!rank) {
        return message.channel.send(`Nutze \`!join <role>\` um einer der folgenden Skill-Gruppe beizutreten: \`${skillGroups.join("`, `")}\`.`);
    }

    if (skillGroups.indexOf(rank.toLowerCase()) === -1) {
        return;
    }

    role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());

    if (!role) {
        return;
    }

    if (message.member.roles.has(role.id)) {
        message.member.removeRole(role, `Requested via !join.`).then(() => {
            message.channel.send(`Du wurdest aus der **Gruppe ${role.name}** entfernt.`)
        }).catch((error) => {
            // No Perms
        })

    } else {
        message.member.addRole(role, `Requested via !join.`).then(() => {
            message.channel.send(`Du wurdest zur Gruppe **${role.name}** hinzugefügt.`)
        }).catch((error) => {
            // No Perms
        })
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: `join`,
    category: `Utility`,
    description: `Bekomme nen Rang ohne nen Admin vollzuspamen. - voll schlau von mir`,
    usage: `join <role>`
};
