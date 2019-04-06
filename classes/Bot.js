class Bot {
    constructor(callname, link) {
        this.callname = callname.toLowerCase();
        this.link = `[club${link}|${callname}]`.toLowerCase();
        this.buffer = [];
        this.fastres = {};
    }

    addCommand(item) {
        this.buffer.push(item)
    }

    /*
    addCommand(item) {
        item.keywords.forEach( keyword => {
            this.buffer[keyword] = item
        })
    }
    */

    setFastres(peer_id, bool) {
        this.fastres[peer_id] = bool;
    }

    on(data) {
        data.text = data.text.toLowerCase()

        let arr = data.text.split(' ');
        arr.forEach( (item) => {
            item.replace(',', '');
        });

        let cmd = '';
        let args = '';
        let force = false;

        if (this.fastres[data.peer_id]) {
            cmd = arr.shift();
            args = arr;
            if (cmd == this.callname || cmd == this.link) {
                cmd = args.shift();
            } else {
                this.setFastres(data.peer_id, false)
            }
            if (!cmd) {
                cmd = '';
            }
            force = true;
        }

        if (!force) {
            if (arr[0] != this.callname && arr[0] != this.link) {
                return false
            }

            if (arr.length > 1) {
                arr.splice(0, 1);
                cmd = arr.shift();
                args = arr;
            }
        }

        this.buffer.forEach(item => {
            item.keywords.forEach(keyword => {
                if (keyword == cmd && item.callback) {
                    item.callback(data, args, cmd, this)
                    return
                }
            })
        })
        
        /*
        let command = this.buffer[cmd];
        if (command != undefined || null) {
            if (command.callback) {
                command.callback(data, args, cmd, this)
            }
        }
        */
    }
}

module.exports = Bot