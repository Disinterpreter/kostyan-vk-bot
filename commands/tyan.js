const vk = require('../api/vk')

let groups = [
     -79458616,
    -132807795,
    -121581173,
    -54709527,
    -130914885,
    -111044288,
    -102853758,
    -134982584
]

module.exports = {
    keywords: ['тяночку'],
    callback: async (data) => {
        let post = await vk.random.getPost(groups[Math.floor(Math.random()*groups.length)])
        vk.message.send(data.peer_id, '', post)
    }
}
