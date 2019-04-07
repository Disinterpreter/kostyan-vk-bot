class Bot {
    constructor(callname, link) {
        this.callname = callname.toLowerCase();
        this.link = `[club${link}|${callname}]`.toLowerCase();
        this.buffer = [];
        this.handlers = [];
        this.fastres = {};
    }

    addCommand(item) {
        this.buffer.push(item)
    }

    addHandler(type, callback) {
        this.handlers.push({type: type, callback: callback})
    }

    setFastres(peer_id, bool) {
        this.fastres[peer_id] = bool;
    }

    call(data, res) {
        this.handlers.forEach(item => {
            if (item.type == data.type && item.callback != undefined) {
                item.callback(data.object, res)
            }
        })
    }
}

module.exports = Bot