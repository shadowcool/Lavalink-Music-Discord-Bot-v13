const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  name: "queue",
  description: "The Current Queue of the Server",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(`You must be in a Voice Channel to use this Command.`)
  const player = client.manager.players.get(message.guild.id)
const queue = player.queue;
const embed1 = new MessageEmbed()
.setAuthor(`Queue for ${message.guild.name}`)
.setColor("GREEN");

// change for the amount of tracks per page
const multiple = 10;
const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

const end = page * multiple;
const start = end - multiple;

const tracks = queue.slice(start, end);

if (player.currentTrack) embed1.addField("Current", `[${player.currentTrack.info.title}](${player.currentTrack.info.uri})`);

if (!tracks.length) embed1.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
else embed1.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.info.title}](${track.info.uri})`).join("\n"));

const maxPages = Math.ceil(queue.length / multiple);

embed1.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

return message.channel.send({ embeds: [embed1] });
  }
}