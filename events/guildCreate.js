const chalk = require('chalk');
module.exports = async(client, con, guild) => {
   
    if(client.config.Multiguild_module.enabled) {
            console.log(chalk.yellow(`[SERVER INFO]:`), chalk.rgb(189, 146, 60)(`I have join a server ${guild.name}`))
            await con.query(`SELECT * FROM guilds WHERE guildid='${guild.id}'`, async (err, row) => {
                if (err) throw err;
                if(row[0]) {
                    await con.query(`UPDATE guilds SET active='true' WHERE guildid='${guild.id}'`, async (err, row) => {
                        if(err) throw err;
                    });
                } else {
                    await con.query(`INSERT INTO guilds (active, guildid, prefix, logall, id) VALUES ('true', '${guild.id}', '${client.config.prefix}', 'true', 'id')`, async (err, row) => {
                        if(err) throw err;
                    });
                }
            });
        
        }           
}


