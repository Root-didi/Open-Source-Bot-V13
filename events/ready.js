const chalk = require('chalk');
const express = require("express");
const { joinVoiceChannel } = require('@discordjs/voice');
const ms = require('ms')
const moment = require('moment');
const axios = require('axios');
const figlet = require('figlet');
let i = 0;
const { MessageEmbed, Message } = require('discord.js');


module.exports = async(client, con, ready) => {

        client.distube.on('error', (channel, error) => {
        console.error(error)
        channel.send({ content: `An error encoutered: ${error.slice(0, 1979)}` }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

    client.distube.on('playSong', (queue, song) => {
        let music = new MessageEmbed()
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setAuthor(`Playing Song`, client.user.avatarURL({ dynamic: true }))
        .setColor(client.config.colorhex)
        .setDescription(`**Song:** [${song.name}](${song.url})`)
        .addField(`**Queue Duration:**`, `\`${queue.formattedDuration}\``)
        .addField(`**Requestor:**`, `${song.user}`)
        .setFooter(client.config.copyright)
        .setTimestamp()
        queue.textChannel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

    client.distube.on("addSong", (queue, song) => {
        let music = new MessageEmbed()
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setAuthor(`Song Added`, client.user.avatarURL({ dynamic: true }))
        .setColor(client.config.colorhex)
        .setDescription(`**Song:** [${song.name}](${song.url})`)
        .addField(`**Queue Duration:**`, `\`${queue.formattedDuration}\``)
        .addField(`**Requestor:**`, `${song.user}`)
        .setFooter(client.config.copyright)
        .setTimestamp()
        queue.textChannel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

    client.distube.on("searchCancel", (message) => {
        let music = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`Searching cancelled`)
        message.channel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

    client.distube.on("searchNoResult", (message, query) => {
        let music = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setAuthor(`Error 404`, client.user.avatarURL({ dynamic: true }))
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription(`No result found for ${query}!`)
        .setTimestamp()
        .setFooter(client.config.copyright)
        message.channel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

    client.distube.on("searchResult", (message, results) => {
        let music = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setAuthor(`Search Results`, client.user.avatarURL({ dynamic: true }))
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription(`**Choose an option from below**\n${results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
        .setTimestamp()
        .setFooter(client.config.copyright)
        message.channel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {
            console.log(e)
        });
    });

    client.distube.on("searchDone", (message, answer, query) => {});

    client.distube.on("searchInvalidAnswer", (message, answer) => {
        let music = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setAuthor(`Invalid Answer`, client.user.avatarURL({ dynamic: true }))
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription(`Invalid answer provided for search.`)
        .setTimestamp()
        .setFooter(client.config.copyright)
        message.channel.send({ embeds: [music] }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });
    
    // Bot Port!
    const app = express()
    app.listen(client.config.port)

    setInterval(() => {
        con.ping()
    }, ms('25m'))

    changeStatus(client)

    // Console Logger
    var d = new Date();
    console.clear()
    figlet(`Open Source Bot V13`, {  font: "ANSI Shadow" }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.rgb(0, 31, 235)(data))
        console.log(chalk.white(`─────────────────────────────────────────────────────────────────────────\n`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Logging in as ${client.user.tag}`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Watching ${client.users.cache.size} users`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Prefix: ${client.config.prefix}`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Command Count: ${client.config.command_count}`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Event Count: ${client.config.event_count}`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Event Count: ${client.config.key}`))
        console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(d.toLocaleString()))
        console.log(chalk.white(`\n─────────────────────────────────────────────────────────────────────────\n`))
    })

    let counter = 0;
    await client.users.cache.forEach(async u => {
        await con.query(`SELECT * FROM users WHERE userid='${u.id}'`, async(err, row) => {
            if(err) throw err;
            if(!row[0]) {
                await con.query(`INSERT INTO users (userid) VALUES ('${u.id}')`, async (err, row) => {
                    if(err) throw err;
                    counter = counter + 1;
            })
        }
        })
    })
    
    // Join Voice Channel!
    const channel = client.channels.cache.get(client.config.voicechanneltojoin);
    if (!channel) return client.utils.error(client, "Voice Channel Doesn't Exist. Please make sure you have a valid voice channel ID in Config.");
    let connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    if(connection) {
        setTimeout(() => {
            console.log(chalk.cyan(`[INFO]:`), chalk.white(`Successfully connected to the voice channel!`))
        }, 800)
        }

        
    // Changing Status!
    async function changeStatus(client) {
    if (i >= client.config.presence_module.length) i = 0;
    await client.user.setPresence({
    activities: [{
        name: client.config.presence_module[i].name,
        type: client.config.presence_module[i].type
    }],
    status: client.config.presence_module[i].status
    });
    i++;
    setTimeout(() => {
    changeStatus(client);
    }, 10000)
}};




