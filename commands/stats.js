const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;

    let stats = new Discord.MessageEmbed()
    .setTitle(`Statistics of ${client.user.username}`)
    .setColor('BLUE')
    .addField("Server Count", `${servercount}`)
    .addField("Users Count", `${usercount}`)
    .addField("Channel's Count", `${channelscount}`)
    .addField("Hosted Platform", "Hosting on Glitch with 99% uptime")
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
};

module.exports.help = {
    name: "stats"
}
