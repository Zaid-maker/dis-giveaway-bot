const messages = require("../utils/messages");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Get all Bot Commands",
  run: async (client, interaction) => {
    let helpembed = new EmbedBuilder();
    helpembed.setAuthor({ name: `Commands of ${client.user.username}` });
    helpembed.setColor("#2f3136");
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/attachments/833753190859407411/910562424258715738/DisGiveaway-01-01.png"
    );
    client.commands.map((cmd) => {
      helpembed.addFields({
        name: `\`${cmd.name}\``,
        value: `${cmd.description}`,
      });
    });
    helpembed.setTimestamp();
    helpembed.setFooter({ text: `© DisGiveaway | Have a nice day!` });

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
      embeds: [helpembed],
      components: [row],
      ephemeral: true,
    });
  },
};
