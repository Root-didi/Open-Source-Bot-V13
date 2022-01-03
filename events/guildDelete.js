const chalk = require('chalk');
module.exports = async(client, con, guild) => {
    if(client.config.Multiguild_module.enabled) {
            console.log(chalk.yellow(`[SERVER INFO]:`), chalk.rgb(189, 146, 60)(`Bye ${guild.name}`))
            await con.query(`SELECT * FROM guilds WHERE guildid='${guild.id}'`, async (err, row) => {
                if (err) throw err;
                if(row[0]) {
                    await con.query(`UPDATE guilds SET active='false' WHERE guildid='${guild.id}'`, async (err, row) => {
                        if(err) throw err;
                    });
                }
            });
        }           
}



