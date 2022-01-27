const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Gives the Websocket Ping of the Bot",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    execute: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Pong")
        .setDescription(`Current Websocket Ping is: \`${client.ws.ping}\`ms`)
        message.channel.send({ embeds: [embed] })
    }
}