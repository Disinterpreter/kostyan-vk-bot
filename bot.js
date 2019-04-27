const fs = require('fs');
const readline = require('readline');
const vk = require('./api/vk');
const acl = require('./api/acl')

const Bot = require('./classes/Bot');
const commands = require('./commands/_export');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const bot = new Bot(config.name, config['public-id']);

// Регистрация команд
commands.forEach(item => {
    if (!item.callback) {
        item.forEach(_item => { // для нескольких комнад в модуле
            bot.addCommand(_item)
        })
    } else {
        bot.addCommand(item)
    }
})

// Главный обработчик
bot.addHandler('message_new', async (data, res) => {
    res.send('ok')

    data.text = data.text.toLowerCase()

    let arr = data.text.split(' ');
    arr.forEach( (item) => {
        item.replace('[.,?]', '');
    });

    let cmd = '';
    let args = '';
    let force = false; // позволяет "проскочить" проверку на обращение к боту

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
        // поиск обращения к боту
        if (arr[0] != bot.callname && arr[0] != bot.link) {
            return false
        }

        if (arr.length > 1) {
            arr.splice(0, 1);
            cmd = arr.shift();
            args = arr;
        }
    }

    // перебор массива с командами
    bot.buffer.forEach(item => {
        // поиск совпадений
        item.keywords.forEach( async keyword => {
            if (keyword == cmd && item.callback) {
                if (item.access) { // проверка прав (acl)
                    let can = await acl.hasUserPermissionTo(data.from_id, item.access)
                    if (!can)
                        return
                }
                // console.log("NSFW of cmd: "+ item.nsfw)
                // console.log("NSFW of chat: "+ await acl.hasGroupNsfwTo(data.peer_id))
                if (item.nsfw) { // проверка цензуры (acl)
                    let can = await acl.hasGroupNsfwTo(data.peer_id)
                    if (!can || can == false || data.peer_id != data.from_id)
                        return
                }


                item.callback(data, args, cmd, bot)
                return
            }
        })
    })
})

// Второстепенный обработчик
bot.addHandler('message_new', (data) => {
    console.log('ID: '+ data.from_id + " wrote: "+ data.text)
})

// Обработчик подтверждения
bot.addHandler('confirmation', (_, res) => {
    res.send(config.confirmation)
})

// Управление из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (input) => {
    let arr = input.split(' ')
    let cmd = arr[0]
    let peer_id = arr[1]
    arr.splice(0, 2)
    if (cmd == 'say') {
        vk.message.send(peer_id, arr.join(' '))
    }
})

module.exports = bot