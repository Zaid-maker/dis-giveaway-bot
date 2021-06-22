const Discord = require('discord.js');
const config = require('../config.json');
const os = require('os');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;

    let stats = new Discord.MessageEmbed()
    .setAuthor('DevMirza')
    .setTitle(`Statistics of ${client.user.username}`)
    .setColor('BLUE')
    .addFields(
        {name: "Server's Count", value: `${servercount}`, inline: true},
        {name: "User's Count", value: `${usercount}`, inline: true},
        {name: "Channel's Count", value: `${channelscount}`, inline: true},
        {name: "Architecture", value: `${arch}`, inline: true},
        {name: "Platform", value: `${platform}`, inline: true},
        {name: "Nodejs Version", value: `${NodeVersion}`, inline: true},
        {name: "Shard's", value: `${shard}`, inline: true},
        {name: "Core's", value: `${cores}`, inline: true}

    )
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
};

module.exports.help = {
    name: "stats"
}
