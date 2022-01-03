
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    await client.destroy()
    await client.login(client.config.token)

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`**I have been restarted!**`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "restart",
    description: "Reboot the bot!",
    aliases: ['reset', 'reboot']
}