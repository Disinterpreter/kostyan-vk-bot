const vk = require('../api/vk')

let answer = [
    'А?',
    'Да да я',
    'Я тут'
]

module.exports = {
    keywords: [''],
    callback: (data, args, cmd, bot) => {
        bot.setFastres(data.peer_id, true)
        vk.message.send(data.peer_id, answer[Math.floor(Math.random()*answer.length)])
    }
}