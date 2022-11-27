const { Collection, Client, Discord } = require('discord.js-selfbot');
const fs = require('fs');
const client = new Client();
const config = require('./config.json');
const prefix = config.prefix;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
    console.log(`Вошёл в аккаунт ${client.user.tag}`)
})

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(message, args, command, client);
})

client.login(process.env.TOKEN)
