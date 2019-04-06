const axios = require('axios')
const querystring = require('query-string')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

let vkhttp = axios.create({
    baseURL: 'https://api.vk.com/method/',
    timeout: 1000
})

let vkbody = {
    access_token: config['vk-token'],
    v: config.v
}

let api = {}
    api.message = {}
    api.random = {}

api.message.send = async (peer_id, message, attachment) => {
    let body = Object.assign({
        peer_id: peer_id,
        message: message,
        random_id: Math.floor(Math.random()*10000),
        attachment: attachment
    }, vkbody)

    let res = await vkhttp.post('messages.send', querystring.stringify(body, {arrayFormat: 'comma'}))
    console.log(`Sending message: ${message} -> ${peer_id} (${res.status} ${res.statusText})`)
}

api.random.getPost = async (owner_id) => {

}

module.exports = api