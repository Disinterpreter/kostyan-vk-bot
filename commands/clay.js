const vk = require('../api/vk')

module.exports = {
    keywords: ['меси'],
    callback: async (data) => {
        let message = data.text
        let marr = message.split(" ")
        console.log(marr)
        if ( (marr[2] == 'глину') || marr[1] == 'глину') {
            let post = await vk.random.getPhoto('-179588896', '263047835')
            vk.message.send(data.peer_id, post.text, post.url)           
        }
    }
}