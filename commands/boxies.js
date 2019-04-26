const vk = require('../api/vk')

module.exports = {
    keywords: ['коробочка', 'коробочку'],
    callback: async (data) => {
        let post = await vk.random.getPhoto('478080307', '259469122')
        vk.message.send(data.peer_id, post.text, post.url)
    }
}