
const { MessageEmbed } = require("discord.js");

module.exports = async(client, con, message) => {

    if (!message.author) return;
    if (message.author.bot) return;
    
    // If not in Database insert. // 
    let maxedSql = 0;
        await con.query(`SELECT * FROM users WHERE userid='${message.author.id}'`, async(err, row) => {
            if(err) throw err;
            if(!row[0]) {
                await con.query(`INSERT INTO users (userid, userxp, userlvl) VALUES ('${message.author.id}', 0, 1)`, async (err, row) => {
                    if(err) throw err;
                    maxedSql = maxedSql + 1;
                });
            }
        });

    // Leveling System // 
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === client.user.id) {
            await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    let prefixembed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setDescription(`This guilds prefix is \`${row[0].prefix}\``)
                    message.channel.send(prefixembed).catch(e => {});
                }
            });
        }
    }
    if(client.config.leveling_module.enabled === true) {

        let messagelevels = Math.floor(Math.random() * 6) + 5;
        await con.query(`SELECT * FROM users WHERE userid='${message.author.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                let usercurrentxp = row[0].userxp;
                let usercurrentLvl = row[0].userlvl;
                let usernextLvl = row[0].userlvl * client.config.leveling_module.levelUpMultiplier;
                let SQLMafs =  usercurrentxp + messagelevels;

                await con.query(`UPDATE users SET userxp='${SQLMafs}' WHERE userid='${message.author.id}'`, async (err, row) => {});

                if(usernextLvl <= row[0].userxp){

                    await con.query(`UPDATE users SET userlvl = userlvl + 1 WHERE userid='${message.author.id}'`, async (err, row) => {
                        if(err) throw err;
                    });

                    const lvlembed = new MessageEmbed()
                    .setColor(`${client.config.colorhex}`)
                    .setDescription(`${message.author}, You have leveled up to level: **${usercurrentLvl + 1}**`)
                    message.channel.send({ embeds: [lvlembed] }).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 30000)
                    }).catch(e => {});

                }
            }
        });

    }

    // MAIN CORE DONT TOUCH // 
    
    if (message.content.startsWith(client.config.prefix)) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        const cmd = await client.commands.get(command)
        if (cmd) {
            try {
                await cmd.run(client, message, args, con);
                if(client.config.deleteCommands) {
                    message.delete().catch(e => {});
                }
                if(client.config.logging_module.commands) {
                    let logembed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setAuthor(`Logging Entry - Command Entered`)
                    .addFields(
                        {name: `User:`, value: `<@${message.author.id}>`, inline: true},
                        {name: `Channel:`, value: `<#${message.channel.id}>`, inline: true},
                        {name: `Command:`, value: `\`\`\`${message.content}\`\`\``},
                    )  
                    .setTimestamp()
                    .setFooter(client.config.copyright)
                    client.config.logging_module.commandsChannels.forEach(async c => {
                        let deChan = await client.channels.cache.get(c)
                        if(deChan == undefined) {
                            console.log(chalk.yellow(`[WARNING]:`), chalk.white(`Command Logs Channel not provided.`))
                        } else {
                            deChan.send({ embeds: [logembed] }).catch(e => {});
                        }
                    });
                }
                
            } catch(e) {
                return client.utils.error(client, e);
            }
        }
    }
    if (message.author.bot) return;

    // Command Checker
    await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            let prefix = row[0].prefix
            if (message.content.startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                let command = args.shift().toLowerCase();
                const cmd = client.commands.get(command)
                if (cmd) {
                    try {
                        cmd.run(client, message, args, con);
                    } catch(e) {
                        return client.utils.error(client, e);
                    }
                }
            }
        } else {
            client.utils.guildload(client, con, message)
        }
    });

}
