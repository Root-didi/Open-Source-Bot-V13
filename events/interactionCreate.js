/*

  ███████╗██╗   ██╗███████╗██╗ ██████╗ ███╗   ██╗██████╗  ██████╗ ████████╗    ██╗   ██╗ ██╗    ██████╗ 
  ██╔════╝██║   ██║██╔════╝██║██╔═══██╗████╗  ██║██╔══██╗██╔═══██╗╚══██╔══╝    ██║   ██║███║   ██╔═████╗
  █████╗  ██║   ██║███████╗██║██║   ██║██╔██╗ ██║██████╔╝██║   ██║   ██║       ██║   ██║╚██║   ██║██╔██║
  ██╔══╝  ██║   ██║╚════██║██║██║   ██║██║╚██╗██║██╔══██╗██║   ██║   ██║       ╚██╗ ██╔╝ ██║   ████╔╝██║
  ██║     ╚██████╔╝███████║██║╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝   ██║        ╚████╔╝  ██║██╗╚██████╔╝
  ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝    ╚═╝         ╚═══╝   ╚═╝╚═╝ ╚═════╝ 
                                                                                                                                                                         
  FusionBot v1.0.0 is the newest DiscordBot coding in the newest framework v13! 
   
  Main Credits : Github, Stackoverflow, Other public sources.
                                                                                                                                                                                                                                                                                   
*/

const Discord = require('discord.js')
const config = require('../config.js')
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = async(client, con, interaction) => {

  if (!interaction.isButton()) return;
  let message = interaction.message

  // Ticket System 


  if(interaction.customId === 'ticket_open') {
    const supportrole = config.permissions_module.ticket_perms
            let permissionOverwriteArray = [{
              id: interaction.user.id,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
          },
          {
              id: message.guild.id,
              deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
          },
      ]
      supportrole.forEach(role => {
        const theSupportRole = message.guild.roles.cache.get(role);
          if (!theSupportRole) {
              console.log(`${role} is not in the server`)
          } else {
              let tempArray = {
                  id: role,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
              }
              permissionOverwriteArray.push(tempArray);
          }
      })
      
      const theChannelCreate = await message.guild.channels.create(`ticket-${interaction.user.username}`, {
          type: 'text',
          permissionOverwrites: permissionOverwriteArray
      }).then(async chan => {
        chan.setParent(config.ticket_module.categoryID, {lockPermissions: false})
        chan.setTopic(`Ticket for ${interaction.user.username}`)

      message.channel.send({ content: `You have successfully created a ticket. <#${chan.id}>` }).then(msg => {
        setTimeout(() => msg.delete(), 5000)
    })

      const ticketPanelRow = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageButton()
              .setCustomId('ticket_close')
              .setLabel('🔒 Close Ticket')
              .setStyle('DANGER'),
      )  
      .addComponents(
        new Discord.MessageButton()
            .setCustomId('ticket_archive')
            .setLabel('🎫 Archive Ticket')
            .setDisabled()
            .setStyle('SECONDARY'),
    )  
      .addComponents(
        new Discord.MessageButton()
            .setCustomId('ticket_claim')
            .setLabel('🙌 Claim Ticket')
            .setStyle('SUCCESS'),
    )  

      const newTicketEmbed = new Discord.MessageEmbed()
      .setTitle(`Support Ticket`)
      .setColor(config.colorhex)
      .setDescription(`Thank you for creating a ticket! One of our support members shall be with you soon.`)
      chan.send({ embeds: [newTicketEmbed], content: `<@${interaction.user.id}>`, components: [ticketPanelRow]})
      interaction.deferUpdate();
    })}

    if(interaction.customId === 'ticket_close') {
      interaction.reply({ content: `Ticket successfully closing. (Please wait. 5 - 10 Seconds)` })
      setTimeout(() => {
          message.channel.delete();
      }, 8000);
    }

    if(interaction.customId === 'ticket_claim') {
      const claimTicketEmbed = new Discord.MessageEmbed()
      .setColor(config.colorhex)
      .setDescription(`<@${interaction.user.id}> has claimed this ticket.`)
      message.channel.send({ embeds: [claimTicketEmbed] })
      interaction.deferUpdate();
    }

    if(interaction.customId === 'ticket_archive') {
      message.channel.send({ content: "• Ticket Archive is still in the works please wait."})
      interaction.deferUpdate();
    }

    // Help Menu

    if(interaction.customId === 'home_page') {
      const homepageEmbed = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Help Menu.`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .addFields(
          { name: "Bot Name", value: `\`${client.user.username}\``, inline: true, },
          { name: "Bot Prefix", value: `\`${client.config.prefix}\``, inline: true, },
          { name: "Current Version", value: `\`1.0.0\``, inline: true, },
          { name: "Information:", value: `\`\`\`Welcome to the HomePage! Here you will find out all the information about the commands within the bot.\`\`\``},        
          { name: "Selection:", value: `\`\`\`Please select the correct category you would like to know more about!\`\`\``},        
          { name: "Thank you:", value: `\`\`\`We are very pleased you have gone with DonutBot make sure to stay within discord for future updates!\`\`\``},        
      )
      .setColor(client.config.colorhex)

      message.edit({ embeds: [homepageEmbed]})
      interaction.deferUpdate();
    }

    if(interaction.customId === 'credits_page') {
      const moderationEmbed = new Discord.MessageEmbed()
      .setTitle(`Donut Credits!`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .setDescription(`[Didid#4331](https://didid.zone) - Head of Development`)
      .setColor(client.config.colorhex)
      message.edit({ embeds: [moderationEmbed]})
      interaction.deferUpdate();
    }

    if(interaction.customId === 'Tos_page') {
      const moderationEmbed = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .setTitle(`please follow the tos `)
      .setDescription(`**View our TOS Before Paying [here](${client.config.paypal_module.TOS})**`)
      .setColor(client.config.colorhex)
      message.edit({ embeds: [moderationEmbed]})
      interaction.deferUpdate();
    }
    if(interaction.customId === 'general_page') {
      const moderationEmbed = new Discord.MessageEmbed()
      .setTitle(`General Help!`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .addFields(
        { name: 'Help', value: `\`${client.config.prefix}\`Help`, inline: true },
        { name: 'The Bot Prefix', value: `\`${client.config.prefix}\``, inline: true },
        { name: 'The bot ping Is', value: `\`${client.config.prefix}\`ping`, inline: true },
        { name: 'The website Is', value: `\`${client.config.prefix}\`website`, inline: true },
        { name: 'Give you a meme',value: `\`${client.config.prefix}\`meme`, inline: true },
        { name: 'Make text in to ascii', value: `\`${client.config.prefix}\`ascii`, inline: true },
      )
      .setColor(client.config.colorhex)
      message.edit({ embeds: [moderationEmbed]})
      interaction.deferUpdate();
    }

    // Manager Module
    if(interaction.customId === 'paypal_option') {
      let enabled = client.config.manager_module.usePayPal === true
      if(!enabled) return interaction.reply({ content: "PayPal is currently disabled."})
      const paypal = new MessageEmbed()
      .setTitle(`PayPal Payment`)
      .setColor(client.config.colorhex)
      .setDescription(`**PayPal:** [PayPal Link](${client.config.manager_module.PayPalLink})\n
      Please make sure to send all payments as friends and family.\n
      Please notify us when payment has been sent.`)
      return interaction.reply({ embeds: [paypal], ephemeral: true })
      interaction.deferUpdate();
    }

    if(interaction.customId === 'cashapp_option') {
      let enabled = client.config.manager_module.useCashApp === true
      if(!enabled) return interaction.reply({ content: "Cash App is currently disabled."})
      const cashapp = new MessageEmbed()
      .setTitle(`Cash App Payment`)
      .setColor(client.config.colorhex)
      .setDescription(`**Cash App:** [Cash App Link](${client.config.manager_module.PayPalLink})\n
      Please notify us when payment has been sent.`)
      return interaction.reply({ embeds: [cashapp], ephemeral: true })
      interaction.deferUpdate();
    }
  }