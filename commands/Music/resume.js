const { Client, Message } = require('discord.js')

module.exports = {
  name: "resume",
  description: "Resumes all Songs Going on in a Server",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(`You must be in a Voice Channel to use this Command.`)
    const player = client.manager.players.get(message.guild.id)

    player.pause(false);
    message.channel.send(`I have Resumed all On going songs in this server`)
  }
}