const { MessageEmbed, Message } = require('discord.js');

exports.run = async (client, message, args, con) => {

    const permissionCheck = await client.utils.permCheck(client, message, 'moderation')
    if(!permissionCheck) return message.channel.send({ content: `You do not have permission to run this command.`})

    if(!args[0]) return message.channel.send(`**Please include a new prefix in your message.**`).catch(e => {});
    if(args[1]) return message.channel.send(`**Your prefix cannot include a space.**`).catch(e => {});

 await con.query(`UPDATE guilds SET prefix='${args[0]}' WHERE guildid='${message.guild.id}'`, async(err, row) => {
        if(err) throw err;
    });

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`**Your guilds prefix has been updated to \`${args[0]}\`**`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
}


exports.info = {
    name: "test",
    aliases: ['test']
}