class Bot {
    constructor(callname, link) {
        this.callname = callname.toLowerCase();
        this.link = `[${callname}|${link}]`.toLowerCase();
        this.buffer = {};
        this.fastres = {};
    }

    addCommand(item) {
        item.keywords.forEach( keyword => {
            this.buffer[keyword] = item
        })
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
                this.fastres[data.peer_id] = false;
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
            } else {
                this.fastres[data.peer_id] = true;
            }
        }

        let command = this.buffer[cmd];
        if (command != undefined || null) {
            if (command.callback) {
                command.callback(data, args, cmd)
            }
        }
    }
}

module.exports = Bot