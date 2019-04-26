const vk = require('../api/vk')
const axios = require('axios')

module.exports = {
    keywords: ['совет'],
    callback: async (data) => {
        const response = await axios.get('http://fucking-great-advice.ru/api/random')
        vk.message.send(data.peer_id, response.data.text)
    }
}