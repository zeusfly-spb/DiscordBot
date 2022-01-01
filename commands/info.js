module.exports = {
  name: 'info',
  description: 'Отображает информацию о пользователе',
  async execute(message, args) {
      let user
      const id = args.shift()
      if (id) {
        try {
          const member = message.guild.available && await message.guild.members.fetch(id)
          user = member.user
        } catch (e) {
          throw new Error('Аргументом должен быть валидный ID участника гильдии')
        }
      } else {
        user = message.author
      }
    for (let key in user) {
      message.channel.send(`${key} - ${user[key]}`)
    }
  }
}