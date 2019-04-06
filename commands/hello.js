const vk = require('../api/vk')

let answer = [
    'Здарова',
    'О, привет',
    'Привет'
]

module.exports = {
    keywords: ['привет'],
    callback: (data, args, cmd, bot) => {
        bot.setFastres(data.peer_id, true)
        vk.message.send(data.peer_id, answer[Math.floor(Math.random()*answer.length)])
    }
}