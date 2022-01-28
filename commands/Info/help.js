const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "help",
  description: "Gives All Commands of the Bot",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  */
  execute: async(client, message, args) => {
      const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Help Menu`)
      .setFooter(`Made by ShadoW Cool#2293`)
      .setTimestamp()
      .setDescription(`This bot is Made for Music, With Filters, Clean Audio and Easy to Use Features. Run a Command by \`?<Command Name>\``)
      .addField(`Info`, `\`\`\`help, ping\`\`\``)
      .addField(`Music`, `\`\`\`np, pause, play, queue, resume, skip, stop, volume\`\`\``)

      message.channel.send({ embeds: [embed] })
  }
}