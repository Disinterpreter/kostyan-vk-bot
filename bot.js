const fs = require('fs');
const Bot = require('./classes/Bot');
const commands = require('./commands/_export');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

const bot = new Bot(config.name, config['public-id']);

// Регистрация команд
commands.forEach(item => {
    bot.addCommand(item)
})

// Главный обработчик
bot.addHandler('message_new', (data, res) => {
    res.send('ok')

    data.text = data.text.toLowerCase()

    let arr = data.text.split(' ');
    arr.forEach( (item) => {
        item.replace(',', '');
    });

    let cmd = '';
    let args = '';
    let force = false;

    if (bot.fastres[data.peer_id]) {
        cmd = arr.shift();
        args = arr;

        if (cmd == bot.callname || cmd == bot.link) {
            cmd = args.shift();
        } else {
            bot.setFastres(data.peer_id, false)
        }

        if (cmd == '' && args == '') {
            return
        }

        force = true;
    }

    if (!force) {
        if (arr[0] != bot.callname && arr[0] != bot.link) {
            return false
        }

        if (arr.length > 1) {
            arr.splice(0, 1);
            cmd = arr.shift();
            args = arr;
        }
    }

    bot.buffer.forEach(item => {
        item.keywords.forEach(keyword => {
            if (keyword == cmd && item.callback) {
                item.callback(data, args, cmd, bot)
                return
            }
        })
    })
})

// Второстепенный обработчик
bot.addHandler('message_new', (data) => {
    console.log(`Got ${data.text}`)
})

// Обработчик подтверждения
bot.addHandler('confirmation', (_, res) => {
    res.send(config.confirmation)
})

module.exports = bot