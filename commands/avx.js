const vk = require('../api/vk')

module.exports = {
    keywords: ['avx', 'авх'],
    callback: async (data) => {
        vk.message.send(data.peer_id, '', 'video218534351_456239232')
    }
}