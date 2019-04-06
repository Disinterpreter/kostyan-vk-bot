const vk = require('../api/vk')

let answer = [
    'Намана',
    'Отлично',
    'Лучше некуда'
]

module.exports = {
    keywords: ['как'],
    callback: (data, args, cmd, bot) => {
        if (args[0] == 'дела') {
            vk.message.send(data.peer_id, answer[Math.floor(Math.random()*answer.length)])
        }
    }
}