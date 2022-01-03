const Canvas = require("discord-canvas");
const Discord = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');
const ms = require('ms');
module.exports = async(client, con, guildMember) => {

    if(guildMember == undefined) return;

    await con.query(`SELECT * FROM users WHERE userid='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await con.query(`INSERT INTO users (userid, warns, kicks, bans, mutes, isMuted, muteTime, joins, leaves, messages, delMessages, isAfk, balance, workCooldown, crimeCooldown, robCooldown, bank) VALUES ('${guildMember.user.id}', 0, 0, 0, 0, 'false', 0, 1, 0, 0, 0, 'false', 0, 'false', 'false', 'false', 0)`, async (err, row) => {
                if(err) throw err;
            });
        } else {
            await con.query(`UPDATE users SET joins = joins + 1 WHERE userid='${guildMember.user.id}'`, async (err, row) => {
                if(err) throw err;
            });
        }
    });

    await con.query(`SELECT * FROM offlinebans WHERE id='${guildMember.user.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            guildMember.guild.members.ban(guildMember.user.id, {
                reason: row[0].reason
            }).catch(e => {
                console.log(e)
            });
        }
    });
    if(client.config.user_join_module.autoRoleSystem) {
        client.config.user_join_module.autoRoleIds.forEach(async r => {
            await guildMember.roles.add(r);
        });
    }

    if(client.config.user_join_module.enabled) {
        if(client.config.user_join_module.msgtype === 'Message') {
            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ content: `<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server! ${client.config.user_join_module.message}` }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_join_module.msgtype === 'Embed') {
            let welcomeEmbed = new Discord.MessageEmbed()
            .setColor(client.config.user_join_module.embedmsg.colorHex || client.config.colorhex)
            .setTitle(client.config.user_join_module.embedmsg.title || 'Welcome User!')
            .setDescription(`<@${guildMember.user.id}> (${guildMember.user.tag})\nhas joined the server!`)
            .setFooter(client.config.user_join_module.embedmsg.footer || client.config.copyright)
            try {
                if(client.config.user_join_module.embedmsg.List !== '') {
                    await welcomeEmbed.addField("Check out:", client.config.user_join_module.embedmsg.List, false)
                }
                await welcomeEmbed.setThumbnail(guildMember.user.avatarURL())
            } catch(e) {}

            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ embeds: [welcomeEmbed] }).catch(e => {
                    client.utils.error(client, e)
                });
            });
        } else if(client.config.user_join_module.msgtype === 'card') {

            const image = await new Canvas.Welcome()
            .setUsername(guildMember.user.username)
            .setDiscriminator(guildMember.user.discriminator)
            .setMemberCount(guildMember.guild.members.cache.size)
            .setGuildName(client.config.user_join_module.cardMessage.serverName || guildMember.guild.name)
            .setAvatar(guildMember.user.avatarURL({dynamic: true, format: "png"}))
            .setColor("border", client.config.user_join_module.cardMessage.border)
            .setColor("discriminator-box", client.config.user_join_module.cardMessage.border)
            .setColor("message-box", client.config.user_join_module.cardMessage.message)
            .setColor("title", client.config.user_join_module.cardMessage.message)
            .setColor("avatar", client.config.user_join_module.cardMessage.avatar)
            .setBackground(client.config.user_join_module.cardMessage.backgroundImageURL)
            .toAttachment();

            let attachment = new Discord.MessageAttachment(image.toBuffer(), 'welcome.png');
            client.config.user_join_module.channelIds.forEach(async c => {
                let welcomeChannel = await client.channels.cache.get(c)
                await welcomeChannel.send({ files: [attachment] }).catch(e => {
                    client.utils.error(client, e)
                });
            });

        } else {
            console.log(`Invalid Message Type: ${client.config.user_join_module.messageType}`)
        }

    }

}

async function altKick(client, guildMember) {
    try {
        if(client.config.alt_prevention.removeAlts) {
            guildMember.guild.members.kick(guildMember, {
                reason: 'Alt Account Detected!'
            });
        }
    } catch(e) {}
};