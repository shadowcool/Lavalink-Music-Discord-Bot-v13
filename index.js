const { Client, Intents, Collection } = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const { Poru } = require("poru");

const client = new Client({
    allowedMentions: {
      parse: ['users', 'roles'],
      repliedUser: false
    },
    partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES
    ]
  })


const nodes = [
  {
    name: config.lavalink.name,
    host: config.lavalink.host,
    port: config.lavalink.port,
    password: config.lavalink.password,
  },
];

const PoruOptions = {
  library: "discord.js",
  defaultPlatform: "ytmsearch",
};

client.manager = new Poru(client, nodes, PoruOptions)

.on("nodeConnect", async(node) => {
  console.log(`Connected to ${node.name}.`)
})

.on("nodeError", async(node, error) => {
  console.log(`Error in Connecting to ${node.name}\n` + error)
})

.on("trackStart", (player, track) => {
  client.channels.cache
    .get(player.textChannel)
    .send(`🎶 Now playing: ${track.info.title}`);
})

.on("queueEnd", (player) => {
  client.channels.cache
    .get(player.textChannel)
    .send("Queue is over");

  player.destroy();
});

client.on('ready', async() => {
  console.log(`${client.user.tag} is Ready`)
  client.manager.init(client)
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