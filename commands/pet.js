const vk = require('../api/vk')

let dogs = [
    -33798093,
    -74076642,
    -142142878
]

let cats = [
    -3632,
    -74078545,
    -23530818,
    -97665403,
    -126988526,
    -32015300,
    -151186434,
    -76953625,
    -33621085
]

module.exports = {
    keywords: ['кот', 'котейка', 'собака', 'бака'],
    access: 1,
    callback: async (data, _, cmd) => {
        let public
        switch (cmd) {
            case 'кот': case 'котейка':
            public = cats[Math.floor(Math.random()*cats.length)]
            break

            case 'собака': case 'бака':
            public = dogs[Math.floor(Math.random()*dogs.length)]
            break
        }
        let post = await vk.random.getPost(public)
        vk.message.send(data.peer_id, '', post)
    }
}
