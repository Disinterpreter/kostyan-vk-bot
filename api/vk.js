const axios = require('axios')
const querystring = require('querystring')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

let vkhttp = axios.create({
    baseURL: 'https://api.vk.com/method/',
    timeout: 1000
})

let api = {}
    api.message = {}
    api.random = {}

api.message.send = async (peer_id, message) => {
    let body = {
        access_token: config['vk-token'],
        v: config.v,
        peer_id: peer_id,
        message: message,
        random_id: Math.floor(Math.random()*10000)
    }
    let res = await vkhttp.post('messages.send', querystring.stringify(body))
    console.log(`Sending message: ${message} -> ${peer_id} (${res.status} ${res.statusText})`)
}

api.random.getPost = async (owner_id) => {

}

module.exports = api