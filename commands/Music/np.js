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
  const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
});
const queue = player.queue;
const embed1 = new MessageEmbed()
.setAuthor(`Playing in ${message.guild.name}`)
.setColor("DARK_BLUE");

if (queue.current) {
    embed1.addField("Now Playing", `[${queue.current.title}](${queue.current.uri})`);
}else {
    embed1.addField("Now Playing", `No Songs are Being Played`)
}
message.channel.send({ embeds: [embed1] })
  }
}