const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "np",
  description: "Sends the Now Playing Song",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(`You must be in a Voice Channel to use this Command.`)
  const player = client.manager.players.get(message.guild.id)
const embed1 = new MessageEmbed()
.setAuthor(`Playing in ${message.guild.name}`)
.setColor("GREEN");

if (player.currentTrack) {
    embed1.addField("Now Playing", `[${player.currentTrack.info.title}](${player.currentTrack.info.uri})`);
}else {
    embed1.addField("Now Playing", `No Songs are Being Played`)
}
message.channel.send({ embeds: [embed1] })
  }
}