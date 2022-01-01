const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')
const { prefix, token, webhookName } = config
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const bot = new Discord.Client()
bot.commands = new Discord.Collection()
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.name, command)
}

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || !(message.author.username === webhookName && message.author.bot || !message.author.bot)) {
    return
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()
  if (!bot.commands.has(command)) {
    return
  }
  try {
    bot.commands.get(command).execute(message, args)
  } catch (e) {
    message.reply(e.message)
  }
})
bot.once('ready', () => { console.log(`${bot.user.username} ready`) })
bot.login(token)