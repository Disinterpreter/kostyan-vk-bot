const vk = require('../api/vk')

module.exports = {
    keywords: [''],
    callback: (data, args, cmd) => {
        vk.message.send(data.peer_id, 'А?')
    }
}