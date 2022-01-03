const { MessageEmbed, Message } = require('discord.js');

exports.run = async (client, message, args) => {

    const permissionCheck = await client.utils.permCheck(client, message, 'moderation')
    if(!permissionCheck) return message.channel.send({ content: `You do not have permission to run this command.`})

    let error = new MessageEmbed()
    .setColor(client.config.colorhex)
    .setDescription(`Please include me somehting to embed.`)
    if(!args[0]) return message.channel.send({ embeds: [error] })

    try {
        const embed = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(client.config.staffembed_module.title || 'Staff Embed!')
        .setDescription(args.join(" "))
        message.channel.send({ embeds: [embed]})
    } catch(e) {
        return client.utils.error(client, e);
    }

}

exports.info = {
    name: "sayem",
    aliases: ['embed']
}