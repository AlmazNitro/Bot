const config = require ('../config.json')
const Discord = require('discord.js');

module.exports = async (bot, message) => {
    const prefix = config.prefix
    if (message.guild) {

        const args = message.content.slice(prefix.length).trim().split(/ +/g) // аргументы для команд
        const commandName = args.shift().toLowerCase() // имя команды (можно будет в будущем сделать обработчик из этого)
        const command = bot.commands.get(commandName)

        if (message.content.startsWith(prefix)) {
            if (command) {  // Если ввели команду - выполняем ее

                try { 
                    command.run(bot, message, args)
                    // Мой обработчик команд, если хочешь можешь оставить
                    console.log(`\n[${new Date()}]`)
                    console.log(ccolor.green('Server: ') + `${message.guild.name} | ` + ccolor.cyan(`${message.guild.id}`))
                    console.log(ccolor.green('Channel: ') + `${message.channel.name} | ` + ccolor.cyan(`${message.channel.id}`))
                    console.log(ccolor.green('User: ') + `${message.author.tag} | ` + ccolor.cyan(`${message.author.id}`))
                    console.log(ccolor.green('Command: ') + `${prefix}${commandName}`)
                    console.log(ccolor.green('ARGS: ') + `${args.join(' ') || ccolor.yellow('Нет параметров для выполнения')}`)
                }
                catch (error)
                {
                console.error(error)
                message.reply('Произошла ошибка при выполнении этой команды')
            }
        }
     
    }
    } if (message.mentions.users.first() == bot.user) {
        message.channel.send(`Мой префикс \`${config.prefix}\``)
    }
}
