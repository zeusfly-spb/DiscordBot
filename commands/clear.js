module.exports = {
  name: 'clear',
  description: 'Удаляет указанное количество строк',
  execute(message, args) {
    const amount = parseInt(args.shift())
    if (!amount) {
      throw new Error('Ошибка использования команды, аргумент должен быть положительным числом')
    }
    message.channel.bulkDelete(amount + 1, true)
  },
}