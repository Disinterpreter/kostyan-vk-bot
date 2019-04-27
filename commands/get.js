const vk = require('../api/vk')
const meme = require('./meme')
const advice = require('./advice')
const boxies = require('./boxies')
const tyan = require('./tyan')

module.exports = {
    keywords: ['дай', 'где'],
    callback: (data, args) => {
        meme.keywords.forEach(item => {
            if (args[0] == item) {
                meme.callback(data)
            }
        })
        advice.keywords.forEach(item => {
            if (args[0] == item) {
                advice.callback(data)
            }
        })
        boxies.keywords.forEach(item => {
            if (args[0] == item) {
                boxies.callback(data)
            }
        })
        tyan.keywords.forEach(item => {
            if (args[0] == item) {
                tyan.callback(data)
            }
        })
    }
}