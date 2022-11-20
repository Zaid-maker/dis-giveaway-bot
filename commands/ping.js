const messages = require("../utils/messages");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Tells a bot latency,",
  run: async (client, interaction) => {
    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has("SEND_MESSAGES")) {
      return interaction.reply({
        content:
          ":x: You need to have the manage messages permissions to start giveaways.",
        ephemeral: true,
      });
    }

    let circles = {
      green: "<:online:903711513183940669>",
      yellow: "<:idle:903711513490112512> ",
      red: "<:dnd:903711513066487851>",
    };

    let botping = new EmbedBuilder()
      .setTitle(`${client.user.username} Ping`)
      .setColor("2f3136")
      .addFields({
        name: "<:connection2:896715171454677013> Bot Ping:",
        value: `${
          client.ws?.ping <= 200
            ? circles.green
            : client.ws?.ping <= 400
            ? circles.yellow
            : circles.red
        } ${client.ws?.ping}ms`,
      })
      .setTimestamp();
    await interaction.reply({ embeds: [botping] });
  },
};
