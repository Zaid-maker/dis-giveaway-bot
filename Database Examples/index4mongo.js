const fs = require('fs');

const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

const config = require('./config.json');
client.config = config;

// Load quickmongo.
const { Database } = require('quickmongo');
const db = new Database(config.mongodb_url);

// Check the DB when it is ready
db.on('ready', async () => {
    if (!Array.isArray(await db.get('giveaways'))) await db.set('giveaways', []);
    // Start the manager only after the DB got checked to prevent an error
    client.giveawaysManager._init();
    console.log('SUCCESS!');
});

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database
        return await db.get('giveaways');
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await db.push('giveaways', giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Get all giveaways from the database
        const giveaways = await db.get('giveaways');
        // Remove the unedited giveaway from the array
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
        // Push the edited giveaway into the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        await db.set('giveaways', newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Get all giveaways from the database
        const giveaways = await db.get('giveaways');
        // Remove the giveaway from the array
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageId !== messageId);
        // Save the updated array
        await db.set('giveaways', newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
}, false);

client.giveawaysManager = manager;

/* Load all commands */
client.commands = new Discord.Collection();
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, {
            name: commandName,
            ...props
        });
        console.log(`👌 Command loaded: ${commandName}`);
    });
    synchronizeSlashCommands(client, client.commands.map((c) => ({
        name: c.name,
        description: c.description,
        options: c.options,
        type: 'CHAT_INPUT'
    })), {
        debug: true
    });
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// Login
client.login(config.token);
