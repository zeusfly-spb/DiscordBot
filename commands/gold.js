module.exports = {
  name: 'gold',
  description: 'Управляет ролью Gold',
  async execute(message, args) {
    const { goldRoleId } = require('../config.json')
    const mode = args.shift()
    if (!['add', 'remove'].includes(mode)) {
      throw new Error('Неверный режим, используйте "add" и "remove"')
    }
    if (!message.guild.available) {
      throw new Error('Невозможно получить доступ к экземпляру гильдии')
    }
    let member
    const id = args.shift()
    if (id) {
      try {
        member = await message.guild.members.fetch(id)
      } catch (e) {
        throw new Error('Аргументом должен быть валидный ID участника гильдии')
      }
    } else {
      throw new Error('Неверное использование функции, вторым аргументом должен быть валидный ID участника гильдии')
    }
    if (member) {
      member.roles[mode](goldRoleId)
      message.reply('OK')
    }
  }
}