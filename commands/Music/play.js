const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "play",
  description: "Plays a Song",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const embed = new MessageEmbed()
    .setDescription(`You must be in a Voice Channel to use this Command.`)
    .setColor("DARK_BLUE")
    if (!voiceChannel) return message.channel.send({ embeds: [embed] })

    const res = await client.manager.search(
      message.content.slice(6),
      message.author
    );

    const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
    });

    if(player.state !== 'CONNECTED') player.connect()

    player.queue.add(res.tracks[0]);
    message.channel.send(`Added ${res.tracks[0].title} to the Queue`);

    if (!player.playing && !player.paused && !player.queue.size) {
        player.play();
    }

    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
        player.play();
    }
  }
}