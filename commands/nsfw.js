const vk = require('../api/vk')
const acl = require('../api/acl')

module.exports = [
    {
        keywords: ["цензура"],
        access: 100,
        callback: async (data, args) => {
            let message = "Права этого чата были установлены на "
            let right = ""
            let state = await acl.hasGroupNsfwTo(data.peer_id)
            console.log(state)
            if (state == true) {
                acl.setGroupNsfw(data.peer_id, false)    
                right = "запретить"
            } else {
                acl.setGroupNsfw(data.peer_id, true)    
                right = "разрешить"
            }
            acl.setGroupNsfw(data.peer_id, true)
            vk.message.send(data.peer_id, message +''+ right);
        }
    }
]

