const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun Pingini Gösterir')
        .setDMPermission(false),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const initialResponse = await interaction.reply({ content: '**Yükleniyor..**', ephemeral: true });

        setTimeout(async () => {
            await initialResponse.edit({ content: `🏓 Pingim: **${client.ws.ping}ms**` });
        }, 1000);
    },
};