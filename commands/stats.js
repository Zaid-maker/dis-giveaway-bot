const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;
    let shards = shard.id;

    let stats = new Discord.MessageEmbed()
    .setTitile("Statsistics of the Bot!")
    .addField("Server Count", `${servercount}`)
    .addField("Users Count", `${usercount}`)
    .addField("Channel's Count", `${channelscount}`)
    .addField("Shards", `${shards}`)
    .addField("Hosted Plateform", "Hosted on Glitch 24/7")
    message.channl.send(stats);
};

module.exports.help = {
    name: "stats"
}