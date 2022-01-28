const { Client, Message } = require('discord.js')

module.exports = {
  name: "skip",
  description: "Skips a Song",
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
    if (player.playing) {
        message.channel.send(`I Skipped the On Going Song`)
        player.stop()
    } else {
        message.channel.send(`No songs are On Going in this Server.`)
    }
  }
}