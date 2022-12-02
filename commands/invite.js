const messages = require("../utils/messages");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get Invite Link for DisGiveaway",
  run: async (client, interaction) => {
    let invite = new EmbedBuilder()
      .setTitle(`${interaction.user.tag}`)
      .setDescription("You can invite the bot by clicking on the below button.")
      .setColor("#2f3136")
      .setFooter({ text: `© DisGiveaway | Have a nice day!` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji("865572290065072128")
        .setLabel(`Invite ${client.user.username}`)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=910559370843131944&permissions=8&scope=bot%20applications.commands`
        )
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      embeds: [invite],
      components: [row],
      ephemeral: true,
    });
  },
};
