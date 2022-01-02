const {premiumRoleId} = require("../config.json");
module.exports = {
  name: 'premium',
  description: 'Управляет ролью Premium',
  async execute(message, args) {
    const { premiumRoleId } = require('../config.json')
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
    if (!!member) {
      try {
        member.roles[mode](premiumRoleId)
        message.reply('OK')
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}