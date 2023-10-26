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
    .setColor("GREEN")
    if (!voiceChannel) return message.channel.send({ embeds: [embed] })

    const track = args.join(" ");

    if(!track) return message.reply("Please provide a track to play.")

    const res = await client.manager.resolve({ query: track, source: "ytmsearch", requester: message.member });

    if (res.loadType === "LOAD_FAILED") {
      return message.reply("Failed to load track.");
    } else if (res.loadType === "NO_MATCHES") {
      return message.reply("No source found!");
    }
  
    //create connection with discord voice channnel
    const player = client.manager.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channelId,
      textChannel: message.channel.id,
      deaf: true,
    });
  
    if (res.loadType === "PLAYLIST_LOADED") {
      for (const track of res.tracks) {
        track.info.requester = message.user;
        player.queue.add(track);
      }
  
      message.reply(
        `${res.playlistInfo.name} has been loaded with ${res.tracks.length}`
      );
    } else {
      const track = res.tracks[0];
      track.info.requester = message.user;
      player.queue.add(track);
      message.reply(`Queued Track \n \`${track.info.title}\``)
    }
  
    if (!player.isPlaying && player.isConnected) player.play();
  }
}