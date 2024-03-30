const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const db = require('mzrdb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanal-sıfırla')
        .setDescription('Otomatik GIF/Resim gönderilecek kanalı sıfırlarsınız.')
        .setDMPermission(false)
        .addStringOption(option => option
            .setName('tür')
            .setDescription('GIF sisteminimi yoksa Resim sistemini mi sıfırlamak istiyorsun?')
            .setRequired(true)
            .addChoices(
                { name: 'GIF Kanalını Sıfırla', value: 'gif' },
                { name: 'Resim Kanalını Sıfırla', value: 'resim' }
            )),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const tür = options.getString('tür');

        if (tür == 'gif') {
            const otoGif = db.get(`otoGif.${guild.id}`);
            if (!otoGif) return interaction.reply({ content: `Bu sistemi daha önceden kurulmamış! Kurmak için **/kanal-ayarla**`, ephemeral: true });

            db.delete(`otoGif.${guild.id}`);
            clearInterval(client.gifInterval[0]);

            return interaction.reply({ content: `Başarıyla oto gif sistemi sıfırladım!`, ephemeral: true });
        } else {
            const otoResim = db.get(`otoResim.${guild.id}`);
            if (!otoResim) return interaction.reply({ content: `Bu sistemi daha önceden kurmuşsunuz! Sıfırlamak için **/kanal-ayarla**`, ephemeral: true });

            db.delete(`otoResim.${guild.id}`);
            clearInterval(client.resimInterval[0]);

            return interaction.reply({ content: `Başarıyla oto resim sistemini sıfırladım!`, ephemeral: true });
        };
    },
};











































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!