const { Client, Message } = require('discord.js')

module.exports = {
  name: "volume",
  description: "Sets the Volume of the Music",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(`You must be in a Voice Channel to use this Command.`)
  const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
});
const volume = Number(args[0]);

if (!volume || volume < 1 || volume > 100) return message.channel.send(`You need to give me a volume between 1 and 100.`);

player.setVolume(volume);
return message.channel.send(`I have set the player volume to \`${volume}\`.`);   
  }
}