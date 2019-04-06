const vk = require('../api/vk')

let answer = [
    'Намана',
    'Отлично',
    'Лучше некуда'
]

module.exports = {
    keywords: ['как', 'дела'],
    callback: (data, args, cmd, bot) => {
        if (cmd == 'как' && args[0] == 'дела' || cmd == 'дела' && args[0] == 'как') {
            vk.message.send(data.peer_id, answer[Math.floor(Math.random()*answer.length)])
        }
    }
}