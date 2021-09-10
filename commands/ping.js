const Discord = require("discord.js");

module.exports = {
  description: 'Tells bot client latency.',

  run: async (client, interaction) => {

    const m = await interaction.reply("Hold on......");

    let pong = new Discord.MessageEmbed()
    .setTitle("🏓 Pong!")
    .setColor("DARK BLUE")
    .setTimestamp()
    .addFields(
      {
        name: "Message Response Time",
        value: `${m.createdTimestamp - message.createdTimestamp}ms`,
        inline: true,
      },
      { name: "Client Ping", value: `${Math.round(client.ws.ping)}ms` }
    )
    .setFooter(
      `Requested by ${message.author.tag}`,
      message.author.displayAvatarURL()
    );

    m.edit(pong);
  }
};
