const vk = require('../api/vk')

module.exports = {
    keywords: [''],
    callback: (data, args, cmd, bot) => {
        bot.setFastres(data.peer_id, true)
        vk.message.send(data.peer_id, 'А?')
    }
}