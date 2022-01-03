const config = {
    //Main Bot
    token: "", // Discord Bot Developer Portal Token
    prefix: "!", // Prefix
    servername: "Your server name", // Your server name
    serverid: "server id", 
    port: "8000",
    debugmode: false, // Debug Mode See errors 
    colorhex: "#1673B6",
    voicechanneltojoin: "When bot starts", // Bot on start join VC
    deleteCommands: false, // Delete Commands when ran
    website: "Website",
    logs:"true",
    logsChannels:["Channels logs"],
    //End Main Bot
    paypal_module:{
        paypal: "Paypal.me name",
        TOS: "Link to tos",
    },
       //
   permcheck:{
    moderation: ['Id'],
   },

// Presence Config (Required)
    presence_module: [
        {name: "Code", type: "WATCHING", status: "online"}, // The bot will cycle through these
    ],

// Not working yet Leveling Module Settings
        leveling_module: {
            enabled: true, // Toggle on or off
    
            levelUpMultiplier: 250, // Every how much XP they level up!
        },
// MySQL Config (Required)
    database: {
        host: "Database Host Ip", // 
        user: "Database UserName", // 
        password: "Database password", // 
        database: "Database Name" // 
    }, 
//Sill work on Multiguild Do not work yet
Multiguild_module: {
    enabled: true,
},
  //Welcome
  user_join_module: {
    enabled: true,
    autoRoleSystem: true,
    //Main settings for "Welcome module
    autoRoleIds: ['id'], //id
    channelIds: ["id"], //id
    msgtype: "card", // Message = Normal Message, Embed = Embeded Message, card = card Message (image)
    //MSG types
    message: "Test",
    //Embed Message
    embedmsg: {
        colorHex: "ffff",
        title: "Welcome User!",
        List: "<#Channel ID> & <#Channel ID>", 
        footer: "test",
    },
    //Card Message
    cardMessage: { // Only fill this out if messageType = card
        servername: "test", // If your server name is long, you can use this to customize it for the bot, if empty, it will use your server name
        border: "#000000", // https://htmlcolorcodes.com/
        username: "#8015EA", // https://htmlcolorcodes.com/
        message: "#002eff", // https://htmlcolorcodes.com/
        avatar: "#8015EA", // https://htmlcolorcodes.com/
        backgroundImageURL: "backgroundImageURL" // The image for the background of the card
    },
},
    // Logging Module (Required)
    logging_module: {
        commands: true, // True - False to turn command entrys on or off
        commandsChannels: [""], // Channel ID to send Command Entry's to
    },

       command_count: 0,
       event_count: 1,
   }

module.exports = config;