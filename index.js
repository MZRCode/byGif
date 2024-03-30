const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const intentler = Object.values(GatewayIntentBits);
const partiallar = Object.values(Partials);

const client = new Client({
  intents: intentler,
  partials: partiallar,
});

client.config = require('./config.json');
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.gifInterval = [];
client.resimInterval = [];

const { loadEvents } = require('./Handlers/eventHandler');
loadEvents(client);

client.login(client.config.token);


























































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!