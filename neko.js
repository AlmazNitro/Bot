const Discord = require('discord.js')
const fs = require('fs')
const config = require ('./config.json')

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

ccolor = require('ansi-colors')

fs.readdir('./commands/', async (err, files) => {
    if (err) return console.log(ccolor.red('COMMAND ERROR: ') + ccolor.grey(err))
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        let props = require(`./commands/${file}`)
        let cmdName = file.split('.')[0]
        console.log(ccolor.yellowBright('LOAD: ') + ccolor.cyanBright(`Команда ${cmdName}`))
        bot.commands.set(cmdName, props)
    })
    console.log('===============================')
})

fs.readdir('./events/', (err, files) => {
    if (err) return console.log(ccolor.red('EVENT ERROR: ') + ccolor.grey(err))
    console.log('===============================')
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const evt = require(`./events/${file}`)
        let evtName = file.split('.')[0]
        console.log(ccolor.yellowBright('LOAD: ') + ccolor.blueBright(`Событие ${evtName}`))
        bot.on(evtName, evt.bind(null, bot))
    })
})

bot.login(config.token)