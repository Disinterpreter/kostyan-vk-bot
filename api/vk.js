const { VK } = require('vk-io')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

const vkpublic = new VK()
vkpublic.token = config['vk-token']

const vkuser = new VK()
vkuser.token = config['vk-token-user']

let api = {}

api.message.send = (peer_id, message) => {
    vkpublic.api.messages.send({peer_id: peer_id, message: message})
}

module.exports = api