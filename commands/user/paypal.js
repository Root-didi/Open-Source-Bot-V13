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
	  .setCustomId('Tos_page')
      .setLabel('📕 TOS')
		.setStyle("SECONDARY")
  )
  const permissionCheck = await client.utils.permCheck(client, message, 'moderation')
  if(!permissionCheck) return message.channel.send({ content: `You do not have permission to run this command.`})
  
  let error = new MessageEmbed()
  .setColor(client.config.colorhex)
  .setDescription(`Please specify an amount & user.`)
  if(!args[0]) return message.channel.send({ embeds: [error] })


  var amount = parseFloat(args[0]);
  var target = message.mentions.users.first() || client.users.cache.get(args[1]);
    
  let error2 = new MessageEmbed()
  .setDescription(`Please specify an amount & user!`)
  .setColor(client.config.colorhex)
  .setTimestamp()
  if (!amount) return message.channel.send(error2);
  if (!target) return message.channel.send(error2);
  var url = `https://paypal.me/${client.config.paypal_module.paypal}/${amount}`
  try {
	let editEmbed = new MessageEmbed()
	.setTitle(`New Payment [${target.tag}]`)
	.setDescription(`[Click here](${url}) to pay`)
    .setColor(client.config.colorhex)
	.setThumbnail(target.displayAvatarURL())
	.setTimestamp()
    message.channel.send({ embeds: [editEmbed], components: [row]}).catch(e => {});
} catch(e) {
	return client.utils.error(client, e);
}

}

exports.info = {
    name: "paypal",
    aliases: ['cmds']
}