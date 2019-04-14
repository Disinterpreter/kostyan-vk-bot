const axios = require('axios')
const querystring = require('query-string')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

let vkhttp = axios.create({
    baseURL: 'https://api.vk.com/method/',
    timeout: 7200
})

let vkbody = { // Public/group
    access_token: config['vk-token'],
    v: config.v
}

let uvkbody = { // User
    access_token: config['vk-token-user'],
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
    let offset = Math.floor(Math.random()*15000)
    let body = Object.assign({
        owner_id: owner_id,
        offset: offset,
        count: 1
    }, uvkbody)

    let res = await vkhttp.post('wall.get', querystring.stringify(body))
    let data = res.data.response

    if (data.items.length == 0) {
        body.offset = Math.floor(Math.random()*data.count)
        res = await vkhttp.post('wall.get', querystring.stringify(body))
        data = res.data.response
    } 

    return `wall${data.items[0].from_id}_${data.items[0].id}`
}

module.exports = api