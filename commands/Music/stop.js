const { Client, Message, MessageEmbed } = require('discord.js')

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
      const player = client.manager.create({
        guild: msg.guild.id,
        voiceChannel: msg.member.voice.channel.id,
        textChannel: msg.channel.id,
    });

    if (player.playing) {
      msg.channel.send(`Stopped all Songs`)
        player.destroy();
    } else {
      const embed = new MessageEmbed()
      msg.channel.send(`No songs are Going on in the Server`)
    }
  }
}