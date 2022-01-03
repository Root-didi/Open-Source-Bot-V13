/*
____              _           _     
|  _ \  ___  _   _| |_ __ _   (_)___ 
| | | |/ _ \| | | | __/ _` |  | / __|
| |_| | (_) | |_| | || (_| |_ | \__ \
|____/ \___/ \__,_|\__\__,_(_)/ |___/
                            |__/     
*/

const { MessageEmbed } = require('discord.js');
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
    let embed = new MessageEmbed()
    .setColor(client.config.user_join_module.embedmsg.colorHex || client.config.colorhex)
    .setTitle(client.config.user_join_module.embedmsg.title || 'Welcome User!')
    .setDescription(`<@698229847041769524> (didid#1)\nhas joined the server!`)
    .setFooter(client.config.user_join_module.embedmsg.footer || client.config.copyright)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "welcomembed",
    aliases: ['Welcome']
}
