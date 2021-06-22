const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    let examples = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor("DARK BLUE")
    .setTitle("Usage examples.")
    .setDescription("Using the bot is really simple and easy.")
    .addFields(
        {name: 'start', value: 'dis!start #channel-name time winner(s) prize'},
        {name: 'end', value: 'dis!end message-id or prize name'},
        {name: 'reroll', value: 'dis!reroll message-id'}
    )
    .setDescription(`If u still stuck or having issues contact the support`)
    .setFooter(`${message.author.tag} If you like join our support :)`, message.author.displayAvatarURL())
}

module.exports.help = {
    name: "example"
}