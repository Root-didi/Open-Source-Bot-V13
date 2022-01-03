/*
____              _           _     
|  _ \  ___  _   _| |_ __ _   (_)___ 
| | | |/ _ \| | | | __/ _` |  | / __|
| |_| | (_) | |_| | || (_| |_ | \__ \
|____/ \___/ \__,_|\__\__,_(_)/ |___/
                            |__/     
*/
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`**View our website [here](${client.config.website})**`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "website",
    aliases: ['w']
}
