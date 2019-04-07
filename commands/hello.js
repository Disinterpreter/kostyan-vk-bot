const vk = require('../api/vk')

let answer = [
    'Здарова',
    'О, привет',
    'Привет'
]

let answerCounter = {}

module.exports = {
    keywords: ['привет', 'здарова', 'здорова'],
    callback: (data, args, cmd, bot) => {
        if (!answerCounter[data.from_id]) {
            answerCounter[data.from_id] = true
            bot.setFastres(data.peer_id, true)
            vk.message.send(data.peer_id, answer[Math.floor(Math.random()*answer.length)])
        } else {
            if (answerCounter[data.from_id] != 'ignore') {
                vk.message.send(data.peer_id, 'Здоровались уже')
                answerCounter[data.from_id] = 'ignore'
                console.log(`Ignoring user${data.from_id} 10 min for "hello" command`)
                setTimeout(() => {
                    console.log(`user${data.from_id} no longer ignored for "hello" command`)
                    answerCounter[data.from_id] = false
                }, 6e5)
            }
        }
    }
}