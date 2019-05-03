//const vk = require('../api/vk')
const meme = require('./meme')
const advice = require('./advice')
const boxies = require('./boxies')
const tyan = require('./tyan')
const avx = require('./avx')
const biography = require('./biography')
const varlamov = require('./varlamov')

module.exports = {
    keywords: ['дай', 'где'],
    callback: (data, args) => {
      [
        advice,
        avx,
        biography,
        boxies,
        meme,
        tyan,
        varlamov
      ].forEach((item) => {
        if (item.keywords.includes(args[0])) item.callback(data)
      })
    }
}

/*
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
        avx.keywords.forEach(item => {
            if (args[0] == item) {
                avx.callback(data)
            }
        })
        biography.keywords.forEach(item => {
            if (args[0] == item) {
                biography.callback(data)
            }
        })
        varlamov.keywords.forEach(item => {
            if (args[0] == item) {
                varlamov.callback(data)
            }
        })
    }
}
*/