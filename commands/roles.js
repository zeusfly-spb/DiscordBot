module.exports = {
  name: 'roles',
  description: 'Отображает все роли гильдии или выбранного его участника ',
  async execute(message, args) {
    if (!message.guild.available) {
      throw new Error('Невозможно получить доступ к экземпляру гильдии')
    }
    let roles
    const id = args.shift()
    if (id) {
      try {
        const member = await message.guild.members.fetch(id)
        roles = member.roles
      } catch (e) {
        throw new Error('Аргументом должен быть валидный ID участника гильдии')
      }
    } else {
      roles = await message.guild.roles.fetch()
    }
    roles.cache.map(role => message.channel.send(`${role.id} - ${role.name}`))
  }
}