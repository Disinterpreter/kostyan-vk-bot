const fs = require('fs')
const express = require('express');
const app = express();

const Bot = require('./classes/Bot');
let commands = require('./commands/_export');

let config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

let bot = new Bot(config.name, config['public-id']);
commands.forEach( item => {
    bot.addCommand(item)
})

app.use(express.json());

app.post('/', (req, res) => {
    switch (req.body.type) {
        case 'confirmation':
        res.send(config.confirmation);
        break

        case 'message_new':
        res.send('ok')
        bot.on(req.body.object);
        break

        default:
        res.send('ok')
        break
    }
})

app.listen(80)