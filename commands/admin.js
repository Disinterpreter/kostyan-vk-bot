const vk = require('../api/vk')
const acl = require('../api/acl')

module.exports = [
    {
        keywords: ["права"],
        access: 100,
        callback: (data, args) => {
            if (!args || !args[0] || !args[1]) {
                return
            }
            acl.setUserAccess(args[0], args[1])
        }
    }
]

