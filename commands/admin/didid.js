const { MessageEmbed } = require('discord.js')


exports.run = async (client, message, args, con) => {

    try {

        if(!args[0]) return message.channel.send({ content: `Please include a case ID to check...` }).catch(e => {});

        await con.query(`SELECT * FROM cases WHERE uniqueid="${args[0]}"`, async (err, row) => {
            if(err) return console.log(err);
            if(!row[0]) {
                message.channel.send({ content: `I was unable to find that case. It may have been deleted.` }).catch(e => {});
            } else {
                var t;
                t = await client.users.fetch(row[0].enforcerid);
                var v;
                v = await client.users.fetch(row[0].userid);
                        const thecase = new MessageEmbed()
                        .setColor(client.config.colorhex)
                        .setTitle(`Case Information:`)
                        .setDescription(`**Number:** ${row[0].uniqueid}\n**Enforcer:** ${t.tag} - (${row[0].enforcerid})\n**User:** ${v.tag} - (${row[0].userid})\n**Type:** ${row[0].type}\n**Reason:** ${row[0].reason}`)
                        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                        message.channel.send({ embeds: [thecase] }).catch(e => {});
            }

        });

    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }
}

exports.info = {
    name: 'case',
    description: 'Check a warning case.',
    aliases: ['warns', 'cases', 'kicks', 'bans', 'mutes', 'punishment', 'casesearch', 'search']
}
