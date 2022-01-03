const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const DisTube = require("distube")
const chalk = require('chalk')
const axios = require('axios');
const mysql = require('mysql');
let enableMySQL = true; 
let con;

class OPClient extends Client {
    constructor(options = {}) {
        super(options);

        this.config = require(`../config`);
        this.utils = require(`./utils/utils`);

        this.commands = new Collection();
        this.aliases = new Collection();
    };
};

// Now we get the cool classes.
const client = new OPClient({
    intents: ['GUILDS', 'GUILD_MESSAGES', "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

// Music Feature
client.distube = new DisTube.default(client, { searchSongs: 10, emitNewSongOnly: true, nsfw: true })

// Command - Event Handlers..
global.__basedir = __dirname;

const init = async() => {
    try {
        if (enableMySQL) {
            try {
                con = mysql.createConnection(client.config.database)
                setTimeout(() => {
                    console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`MySQL Successfully Connected!`))
                    console.log(chalk.red(`[INFO]:`), chalk.rgb(0, 31, 235)(`Successfully imported all users to database!`))              
                }, 4000);
            } catch (e) {
                client.utils.error(client, e)
                return process.exit(1);
            }
        }

        // Command Handler
        const categories = readdirSync(join(__dirname, `../`, `commands`));
        for (let category of categories) {
            const commands = readdirSync(join(__dirname, `../`, `commands/`, category));
            for (let command of commands) {
                let info = require(`../commands/${category}/${command}`);
                if (info.info.name) {
                    client.commands.set(info.info.name, info);
                    if(client.config.logCommandLoading) {
                        setTimeout(() => {
                            console.log(`${chalk.blue('Loaded Command')} ../commands/${category}/${command}`)
                        }, 9000)
                    }
                } else {
                    console.log(`No help name or additional info found for ${command}`);
                    continue;
                }
                if (info.info.aliases[0]) {
                    try {
                        info.info.aliases.forEach(a => {
                            client.commands.set(a, info);
                        })
                    } catch(e) {
                        console.log(`An error occured when adding aliases for ${command}`);
                        continue;
                    }
                }
            }
        };

        // Event handler
        const events = readdirSync(join(__dirname, `../`, `events`));
        events.forEach(e => {
            const name = e.split('.')[0];
            const event = require(`../events/${e}`);
            client.on(name, event.bind(null, client, con));
            delete require.cache[require.resolve(`../events/${e}`)];
        });

    client.login(client.config.token).catch(e => console.log(e));
    } catch(e) {
        console.log(e)
    }
}

const dbct = require("botcordtop.js");
const dbt = new dbct(client.config.bot_top_list, client);

client.on("ready", async () => {
    dbt.serverCount(); 
});


exports.init = init;
