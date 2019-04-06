const vk = require('../api/vk')
const meme = require('./meme')

module.exports = {
    keywords: ['дай', 'где'],
    callback: (data, args) => {
        meme.keywords.forEach(item => {
            if (args[0] == item) {
                meme.callback(data)
            }
        })
    }
}