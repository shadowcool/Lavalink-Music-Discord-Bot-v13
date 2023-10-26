const { Client, Message } = require('discord.js')

module.exports = {
  name: "pause",
  description: "Pauses the Music",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(`You must be in a Voice Channel to use this Command.`)
    const player = client.manager.players.get(message.guild.id)

    if (player.isPlaying) {
        player.pause(true);
        message.channel.send(`I have Paused all On going songs in this server`)
    } else {
      message.channel.send(`No songs are On Going in this Server.`)
    }
  }
}