const vk = require('../api/vk')

module.exports = {
    keywords: ['биография'],
    callback: async (data) => {
        vk.message.send(data.peer_id, '', 'video218534351_456239232')
    }
}