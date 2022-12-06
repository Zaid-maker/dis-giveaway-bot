const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(
    `Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );

  const activities = [
    `Giveaways in ${client.guilds.cache.size} guilds`,
    "/help",
    `over ${client.users.cache.size} users!`,
    `${
      client.giveawaysManager.giveaways.filter((g) => !g.ended).length
    } active giveaways!`,
  ];

  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: ActivityType.Watching });
  }, 20000);
};
