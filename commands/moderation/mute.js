const Command = require('../../base/commands/Command.js')

const ms = require('ms')

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      category: 'Moderation',
      description: 'Ätsch! Da kannst du nichtmehr schreiben.',
      usage: 'mute <@user>',
      dm: false,
      permLevel: 9
    })
  }

  async run(message, args) {
    const muteRoleName = "Muted";
    let toMute = message.guild.member(message.mentions.users.first());
    let toMuteMember = message.guild.members.get(toMute.id) || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send('Wen soll ich muten? Bin ja schon ganz aufgeregt ;)');
    if (toMute.id === message.author.id) return message.channel.send('Das bist doch du xd');
    let muteRole = await msg.guild.roles.find(r => r.name === muteRoleName);
    if (!muteRole){
      try {
        muteRole = await message.guild.createRole({
          name: `${muteRoleName}`,
          color: 'black',
      });
      console.log(`Created role ${role.name}`);

      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      } catch (e) {
        console.log(e);
      };
    };
    const time = args[1] || 60 * 1000;

    if (toMute.roles.has(muteRole.id)) {
      toMute.removeRole(muteRole);
      return message.channel.send(`${toMute} wurde entmutet!`);
    };

    await toMute.addRole(muteRole);
    message.channel.send(`WapBap! ${toMute} wurde für ${ms(ms(time), { long: true })} gemutet!`);

    /* setTimeout(function() {
      toMute.removeRole(muteRole)
      message.channel.send(`Endlich! ${toMute} wurde entmutet!`)
    }, ms(time)) */
  }
}

module.exports = Mute
