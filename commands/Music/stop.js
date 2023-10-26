const { Client, Message } = require('discord.js')

module.exports = {
  name: "stop",
  description: "Stops All Songs ongoing",
  /**
  *
  * @param {Client} client
  * @param {Message} msg
  */
  execute: async(client, msg, args) => {
      const voiceChannel = msg.member.voice.channel;
      if (!voiceChannel) return msg.channel.send(`You must be in a Voice Channel to use this command`)
      const player = client.manager.players.get(msg.guild.id)

    if (player.isPlaying) {
      msg.channel.send(`Stopped all Songs`)
        player.destroy();
    } else {
      msg.channel.send(`No songs are Going on in the Server`)
    }
  }
}