const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new MessageEmbed()
      .setAuthor("DevMirza")
      .setColor("DARK BLUE")
      .setTitle("DisGiveawayBot Commands")
      .addField("😁 Fun", "dis!ping, dis!invite")
      .addField("ℹ Information", "dis!stats")
      .addField("🎁 Giveaway","dis!start [channel-name] [Time] [winners] [Prize]\ndis!reroll [channel id]\ndis!end [channel id]")
      .setTimestamp()
      .setFooter(`Command Requested By ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send(help)
}

module.exports.help = {
  name: "help"
}
