const { randomAvatarGIF, randomAvatarIMG } = require('../../Functions/randomAvatar');
const { ActivityType, Client, EmbedBuilder } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler');
const djs = require('mzrdjs');
const db = require('mzrdb');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
        client.user.setActivity({ name: 'YouTube: MZR Development', type: ActivityType.Streaming, url: 'https://www.twitch.tv/mzrdev' });

        loadCommands(client).then(() => djs.slashBuilder);

        const guilds = await client.guilds.fetch();
        guilds.forEach(async (guild) => {
            const otoGifSystem = db.get(`otoGif.${guild.id}`);
            const otoResimSystem = db.get(`otoResim.${guild.id}`);

            if (otoGifSystem) {
                const fetchedGuild = await guild.fetch();

                const kanalID = Object.keys(otoGifSystem)[0];
                const ms = db.get(`otoGif.${guild.id}.${kanalID}`);

                setInterval(async () => {
                    const randomGIF = await randomAvatarGIF(fetchedGuild);

                    const kanal = await fetchedGuild.channels.fetch(kanalID)

                    const embed = new EmbedBuilder()
                        .setDescription(`[**GIFe Git ↗**](${randomGIF})`)
                        .setImage(randomGIF)
                        .setColor('Blurple')

                    await kanal.send({ embeds: [embed], ephemeral: true });
                }, ms);
            } else if (otoResimSystem) {
                const fetchedGuild = await guild.fetch();

                const kanalID = Object.keys(otoResimSystem)[0];
                const ms = db.get(`otoResim.${guild.id}.${kanalID}`);

                setInterval(async () => {
                    const randomIMG = await randomAvatarIMG(fetchedGuild);

                    const kanal = await fetchedGuild.channels.fetch(kanalID)

                    const embed = new EmbedBuilder()
                        .setDescription(`[**Resime Git ↗**](${randomIMG})`)
                        .setImage(randomIMG)
                        .setColor('Blurple')

                    await kanal.send({ embeds: [embed], ephemeral: true });
                }, ms);
            };
        })
    },
};





































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!