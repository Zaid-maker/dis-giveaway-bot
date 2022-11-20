const messages = require("../utils/messages");
const { EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get all Bot Commands",
  run: async (client, interaction) => {
    let helpembed = new EmbedBuilder();
    helpembed.setColor("RANDOM");
    helpembed.setAuthor({ name: `Commands of ${client.user.username}` });
    helpembed.setColor("#2f3136");
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/attachments/833753190859407411/910562424258715738/DisGiveaway-01-01.png"
    );
    client.commands.map((cmd) => {
      helpembed.addField(`\`${cmd.name}\``, `${cmd.description}`, true);
    });
    helpembed.setTimestamp();
    helpembed.setFooter({ text: `© DisGiveaway | Have a nice day!` });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setEmoji("865572290065072128")
        .setLabel(`Invite ${client.user.username}`)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=910559370843131944&permissions=8&scope=bot%20applications.commands`
        )
        .setStyle("LINK")
    );

    await interaction.reply({
      embeds: [helpembed],
      components: [row],
      ephemeral: true,
    });
  },
};
