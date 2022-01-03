/*
____              _           _     
|  _ \  ___  _   _| |_ __ _   (_)___ 
| | | |/ _ \| | | | __/ _` |  | / __|
| |_| | (_) | |_| | || (_| |_ | \__ \
|____/ \___/ \__,_|\__\__,_(_)/ |___/
                            |__/     
*/
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
          .setCustomId('home_page')
          .setLabel('🏠 Home Page')
          .setStyle('PRIMARY'),
  )
  .addComponents(
      new MessageButton()
          .setCustomId('general_page')
          .setLabel('🔧 General Commands')
          .setStyle('SUCCESS'),
  )
  .addComponents(
    new MessageButton()
        .setCustomId('moderation_page')
        .setLabel('🔒 Moderation Commands')
        .setDisabled()
        .setStyle('DANGER'),
  )
  .addComponents(
    new MessageButton()
        .setCustomId('ticket_page')
        .setLabel('🎫 Ticket Commands')
        .setDisabled()
        .setStyle('SECONDARY'),
  )
  .addComponents(
    new MessageButton()
        .setCustomId('credits_page')
        .setLabel('🤖 DonutBot Credits')
        .setStyle('PRIMARY'),
  )
    const editEmbed = new MessageEmbed()
    .setTitle(`${client.user.username} Help Menu.`)
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .addFields(
        { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
        { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
        { name: "Current Version", value: `\`1.0.0\``, inline: true, },
        { name: "Information:", value: `\`\`\`Welcome to the HomePage! Here you will find out all the information about the commands within the bot.\`\`\``},        
        { name: "Selection:", value: `\`\`\`Please select the correct category you would like to know more about!\`\`\``},        
        { name: "Thank you:", value: `\`\`\`We are very pleased you have gone with Donut make sure to stay within discord for future updates!\`\`\``},        
    )
    .setColor(client.config.colorhex)

    message.channel.send({ embeds: [editEmbed], components: [row]}).catch(e => {});
}

exports.info = {
    name: "help",
    aliases: ['cmds']
}