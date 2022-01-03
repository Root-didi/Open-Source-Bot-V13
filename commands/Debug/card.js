/*
____              _           _     
|  _ \  ___  _   _| |_ __ _   (_)___ 
| | | |/ _ \| | | | __/ _` |  | / __|
| |_| | (_) | |_| | || (_| |_ | \__ \
|____/ \___/ \__,_|\__\__,_(_)/ |___/
                            |__/     
*/

const Canvas = require("discord-canvas");
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
exports.run = async (client, message, args, con, guildMember) => {
    const permissionCheck = await client.utils.permCheck(client, message, 'moderation')
    if(!permissionCheck) return message.channel.send({ content: `No permission.`})
    if(client.config.debugmode === false) return message.channel.send({ content: "This module is disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    const image = await new Canvas.Welcome()
    .setUsername(`Didid`)
    .setDiscriminator(4331)
    .setMemberCount(client.config.user_join_module.cardMessage.serverName)
    .setGuildName(client.config.user_join_module.cardMessage.serverName)
    .setAvatar("https://media.discordapp.net/attachments/899051273825947719/899690973641207818/discord-pfp.gif")
    .setGuildName(client.config.user_join_module.cardMessage.serverName)
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
        await message.channel.send({ files: [attachment] }).catch(e => {client.utils.error(client, e)

        });
    });
}



exports.info = {
    name: "welcomcard",
    aliases: ['Welcome']
}
