const vk = require('../api/vk')

let groups = [
	-178831229
]

module.exports = {
    keywords: ['многоэтажка'],
    callback: async (data) => {
        let post = await vk.random.getPost(groups[Math.floor(Math.random()*groups.length)])
        vk.message.send(data.peer_id, '', post)
    }
}