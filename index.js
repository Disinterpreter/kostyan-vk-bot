const express = require('express');
const app = express();

const _Bot = require('./classes/Bot');
const  Bot = new _Bot('Костян', '123456');
const commands = require('./commands/_export');
commands.forEach( item => {
    Bot.addCommand(item)
})

app.post('/', (req, res) => {
    res.send('ok')
})

app.listen(3000)