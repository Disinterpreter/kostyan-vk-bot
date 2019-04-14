const vk = require('../api/vk')

let groups = [
    -40232010,
    -92876084,
    -150550417,
    -73598440,
    -155464693,
    -148583957,
    -139441547,
    -93082454,
    -164517505
]

module.exports = {
    keywords: ['мем', 'мемас', 'мемчик', 'юмор'],
    callback: async (data) => {
        let post = await vk.random.getPost(groups[Math.floor(Math.random()*groups.length)])
        vk.message.send(data.peer_id, '', post)
        //vk.message.send(data.peer_id, '', ['wall-174299957_39', 'photo-31480508_456283972', 'photo-31480508_456283970'])
    }
}