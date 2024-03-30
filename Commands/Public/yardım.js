const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Yardım Menüsünü Gösterir')
        .setDMPermission(false),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user } = interaction;

        const mzrEmbed = new EmbedBuilder()
            .setTitle('Yardım Menüm')
            .addFields(
                { name: 'Gif/Resim Komutları', value: `- /gif\n- /resim`, inline: false },
                { name: 'Ayarlamalı Komutları', value: `- /kanal-ayarla\n- /kanal-sıfırla`, inline: false },
                { name: 'Bot Sahibi Komutları', value: `- /reload commands\n- /reload events`, inline: false },
                { name: 'Kullanıcı Komutları', value: `- /yardım\n- /ping\n- /invite`, inline: false },
            )
            .setTimestamp()
            .setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('Blurple')

        let mzrButon = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Davet Et')
                .setStyle(ButtonStyle.Link)
                .setEmoji('899716843709812777')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))

        await interaction.reply({ embeds: [mzrEmbed], components: [mzrYardım, mzrButon], ephemeral: false });
    },
};
