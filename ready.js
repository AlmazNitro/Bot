module.exports = async (bot, message) => {

    console.log(ccolor.green(`${bot.user.username} запущена!`))

    bot.user.setPresence({
        status: 'online', 
        game: {
            name: 'Аниме', 
            type: "WATCHING"
        }
    })
}