const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require('discord.js');
const { tenorKey } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resim')
        .setDescription('MZR\'mizin farkını gösteren komutumuz :)')
        .setDMPermission(false)
        .addStringOption(option => option
            .setName('tür')
            .setDescription('Hangi türde resim göndermek istersiniz?')
            .setRequired(true)
            .addChoices(
                { name: 'Erkek', value: 'resimErkek' },
                { name: 'Kız', value: 'resimKiz' },
                { name: 'Hayvan', value: 'resimHayvan' },
                { name: 'Araba', value: 'resimAraba' }
            )),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const tür = options.getString('tür');

        if (tür === 'resimErkek') {
            await resimCreate(interaction, 'boys discord pp');
        } else if (tür === 'resimKiz') {
            await resimCreate(interaction, 'girls discord pp');
        } else if (tür === 'resimHayvan') {
            await resimCreate(interaction, 'animals');
        } else if (tür === 'resimAraba') {
            await resimCreate(interaction, 'luxury car');
        };
    },
};

async function resimCreate(interaction, name) {
    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/search?key=${tenorKey}&q=${name}&limit=1&random=true&searchfilter=sticker,static`);
        const json = await response.json();
        if (!json.results) return await interaction.reply({ content: 'İnternetsel bir problem var, lütfen daha sonra tekrar deneyin!', ephemeral: true });

        return await interaction.reply({ content: json.results[0].media_formats.gifpreview.url, ephemeral: true });
    } catch (e) {
        return await interaction.reply({ content: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin!', ephemeral: true });
    }
}
















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!