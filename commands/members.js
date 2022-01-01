module.exports = {
  name: 'members',
  description: 'Отображает участников гильдии',
  execute(message, args) {
    members = message.guild.members.cache.map(member => {
      const string = `id: ${member.user.id}, username: ${member.user.username}`
      message.channel.send(string)
    })
  },
}