const vk = require('../api/vk')
const acl = require('../api/acl')

module.exports = {
    keywords: ['инфо'],
    callback: async (data) => {
        
        let userinfo = acl.getUserAccess(data.from_id)
        console.log(userinfo)
    }
}