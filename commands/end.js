const ms = require('ms');
const messages = require('../utils/messages');

module.exports =  {
    description: 'End a Giveaway',
    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID or Giveaway prize.',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {
        // If the member doesn't have enough permissions
        if(!interaction.member.permission.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to end giveaways.',
                ephemeral: true
            });
        }


        const query = interaction.options.getString('giveaway');

        // try to found the giveaway with prize then with ID
        const giveaway =
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageID === query && g.guildId === message.guild.id);

        // If no giveaway was found
        if(!giveaway){
            return interaction.reply({
                content: 'Unable to find a giveaway for `'+ query + '`.',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.reply('Giveaway Ended!')
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            })
        });

    }

};
