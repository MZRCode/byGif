const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require('discord.js');
const { tenorKey } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('MZR\'mizin farkını gösteren komutumuz :)')
        .setDMPermission(false)
        .addStringOption(option => option
            .setName('tür')
            .setDescription('Hangi türde GIF göndermek istersiniz?')
            .setRequired(true)
            .addChoices(
                { name: 'Erkek', value: 'gifErkek' },
                { name: 'Kız', value: 'gifKiz' },
                { name: 'Hayvan', value: 'gifHayvan' },
                { name: 'Araba', value: 'gifAraba' }
            )),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user, guild, options } = interaction;

        const tür = options.getString('tür');

        if (tür === 'gifErkek') {
            await gifCreate(interaction, 'boys discord pp');
        } else if (tür === 'gifKiz') {
            await gifCreate(interaction, 'girls discord pp');
        } else if (tür === 'gifHayvan') {
            await gifCreate(interaction, 'animals');
        } else if (tür === 'gifAraba') {
            await gifCreate(interaction, 'luxury car');
        };
    },
};

async function gifCreate(interaction, name) {
    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/search?key=${tenorKey}&q=${name}&limit=1&random=true`);
        const json = await response.json();
        if (!json.results) return await interaction.reply({ content: 'İnternetsel bir problem var, lütfen daha sonra tekrar deneyin!', ephemeral: true });

        return await interaction.reply({ content: json.results[0].url, ephemeral: true });
    } catch (e) {
	console.log(e);
        return await interaction.reply({ content: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin!', ephemeral: true });
    }
}
















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!