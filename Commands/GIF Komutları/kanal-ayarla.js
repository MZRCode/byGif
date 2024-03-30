const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ChannelType, EmbedBuilder } = require('discord.js');
const { randomAvatarGIF, randomAvatarIMG } = require('../../Functions/randomAvatar');
const mzr = require('mzrdjs');
const db = require('mzrdb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanal-ayarla')
        .setDescription('Otomatik GIF/Resim gönderilecek kanalı ayarlarsınız.')
        .setDMPermission(false)
        .addStringOption(option => option
            .setName('tür')
            .setDescription('GIF sisteminimi yoksa Resim sistemini mi kurmak istiyorsun?')
            .setRequired(true)
            .addChoices(
                { name: 'GIF Kanalını Ayarla', value: 'gif' },
                { name: 'Resim Kanalını Ayarla', value: 'resim' }
            ))
        .addChannelOption(option => option
            .setName('kanal')
            .setDescription('Otomatik GIF/Resim gönderilecek kanalı etiketleyin.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addStringOption(option => option
            .setName('süre')
            .setDescription('Ne kadar sürede bir gönderilecek?')
            .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const tür = options.getString('tür');
        const kanal = options.getChannel('kanal');
        const süre = options.getString('süre');
        let ms = mzr.ms('1m');

        if (tür == 'gif') {
            const otoGif = db.get(`otoGif.${guild.id}`);
            if (otoGif) return interaction.reply({ content: `Bu sistemi daha önceden kurmuşsunuz! Sıfırlamak için **/kanal-sıfırla**`, ephemeral: true });

            try {
                ms = mzr.ms(süre);
            } catch {
                return interaction.reply({ content: `**${süre}** yazısı bir süre değildir! Lütfen bir süre yazınız. *Örnek: 1dk*`, ephemeral: true });
            }

            db.set(`otoGif.${guild.id}.${kanal.id}`, ms);

            await interaction.reply({ content: `Sistem başarıyla ${kanal} kanalında kurulmuştur. Her **${süre}** geçtiğinde bu kanala random gif atacağım.`, ephemeral: true });

            try {
                const interval = setInterval(async () => {
                    const kontrol = db.get(`otoGif.${guild.id}`);
                    if (!kontrol);

                    const randomGIF = await randomAvatarGIF(guild);

                    const embed = new EmbedBuilder()
                        .setDescription(`[**GIFe Git ↗**](${randomGIF})`)
                        .setImage(randomGIF)
                        .setColor('Blurple')

                    await kanal.send({ embeds: [embed], ephemeral: true });
                }, ms);

                client.gifInterval.push(interval);
            } catch (e) { }
        } else {
            const otoResim = db.get(`otoResim.${guild.id}`);
            if (otoResim) return interaction.reply({ content: `Bu sistemi daha önceden kurmuşsunuz! Sıfırlamak için **/kanal-sıfırla**`, ephemeral: true });

            try {
                ms = mzr.ms(süre);
            } catch {
                return interaction.reply({ content: `**${süre}** yazısı bir süre değildir! Lütfen bir süre yazınız. *Örnek: 1dk*`, ephemeral: true });
            }

            db.set(`otoResim.${guild.id}.${kanal.id}`, ms);

            await interaction.reply({ content: `Sistem başarıyla ${kanal} kanalında kurulmuştur. Her **${süre}** geçtiğinde bu kanala random resim atacağım.`, ephemeral: true });

            try {
                const interval = setInterval(async () => {
                    const randomIMG = await randomAvatarIMG(guild);

                    const embed = new EmbedBuilder()
                        .setDescription(`[**Resime Git ↗**](${randomIMG})`)
                        .setImage(randomIMG)
                        .setColor('Blurple')

                    await kanal.send({ embeds: [embed], ephemeral: true });
                }, ms);

                client.resimInterval.push(interval);
            } catch (e) { }
        };
    },
};
















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!