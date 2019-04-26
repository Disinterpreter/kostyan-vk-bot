const vk = require('../api/vk')
const acl = require('../api/acl')

module.exports = {
    keywords: ['инфо'],
    callback: async (data) => {
        
        let accessnum = await acl.getUserAccess(data.from_id)
        let outputMessage = 'Твои права: '+ accessnum + '\n'
        + 'Айди беседы: ' + data.peer_id
        vk.message.send(data.peer_id, outputMessage)  
    }
}