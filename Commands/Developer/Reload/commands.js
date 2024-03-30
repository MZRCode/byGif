const { ChatInputCommandInteraction, Client } = require('discord.js');
const { loadCommands } = require('../../../Handlers/commandHandler');

module.exports = {
    subCommand: 'reload.commands',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        loadCommands(client);

        return interaction.reply({ content: 'Komutlar Yeniden Başlatıldı', ephemeral: true });
    },
};






















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
