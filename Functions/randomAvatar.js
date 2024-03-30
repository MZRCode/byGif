const { Guild } = require("discord.js");

/**
 * @param {Guild} guild
 */
async function randomAvatarGIF(guild) {
    const filteredMembers = guild.members.cache.filter(member => !member.user.bot && member.user.avatarURL().toLowerCase().endsWith('gif'));
    const randomMember = filteredMembers.random();

    return randomMember.user.displayAvatarURL();
}

async function randomAvatarIMG(guild) {
    const filteredMembers = guild.members.cache.filter(member => !member.user.bot && !member.user.avatarURL().toLowerCase().endsWith('gif'));
    const randomMember = filteredMembers.random();

    return randomMember.user.displayAvatarURL();
}

module.exports = { randomAvatarGIF, randomAvatarIMG };