const { Client, Intents, MessageEmbed, Collection } = require('discord.js')
const { Manager } = require('erela.js')
const config = require('./config.json')
const filter = require('erela.js-filters')
const Spotify = require('erela.js-spotify')
const Facebook = require('erela.js-facebook')
const Apple = require('erela.js-apple')
const fs = require('fs')
const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({
    allowedMentions: {
      parse: ['users', 'roles'],
      repliedUser: false
    },
    partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_EMOJIS_AND_STICKERS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS"
    ]
  })

client.manager = new Manager({
  nodes: [{
    retryDelay: 5000,
      host: config.lavalink.host,
      port: parseInt(config.lavalink.port),
      password: config.lavalink.password,
  }, ],

  send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
  },
})
.on("nodeConnect", async(node) => {
console.log(`Connected to ${node.options.identifier}.`)
})
.on("nodeError", async(node, error) => {
console.log(`Error in Connecting to ${node.options.identifier}\nError:` + error)
})
.on("trackStart", (player, track) => {
    client.channels.cache
        .get(player.textChannel)
        .send(`🎶 Now playing: ${track.title}`);
})
.on("queueEnd", (player) => {
    client.channels.cache
        .get(player.textChannel)
        .send("Queue is over");

    player.destroy();
});

client.on('raw', async(d) => {
    client.manager.updateVoiceState(d);
})

client.on('ready', async() => {
  console.log(`${client.user.tag} is Ready`)
  client.manager.init(client.user.id)
})

client.on('messageCreate', async(message) => {
    if(message.author.bot || !message.guild) return;
    client.commands = new Collection()
    const cmdFolders = fs.readdirSync("./commands");

    cmdFolders.forEach(cmdFolder => {
      const cmdFiles = fs.readdirSync(`./commands/${cmdFolder}`).filter(f => f.endsWith(".js"));
  
      cmdFiles.forEach(file => {
        const command = require(`./commands/${cmdFolder}/${file}`)
  
        if (command.name && command.execute) {
          client.commands.set(command.name, command);
        }
      })
    })
    const PREFIX = config.discordBot.prefix
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).split(/[ ]+/);
    const command = args.shift().toLowerCase();
    if (!command.length) return;
  
    const cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.execute(client, message, args)
})

client.login(config.discordBot.token)