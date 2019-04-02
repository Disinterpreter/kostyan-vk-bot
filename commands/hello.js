const vk = require('../api/vk')

module.exports = {
    keywords: ['привет'],
    callback: (data, args, cmd) => {
        vk.message.send(data.peer_id, 'Здарова')
    }
}