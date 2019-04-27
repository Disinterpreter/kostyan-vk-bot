const mongoose = require('mongoose');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

mongoose.connect(config.mongo, { useNewUrlParser: true })

const User = mongoose.model('User', { id: String, access: Number })
const Group = mongoose.model('Group', { id: Number, nsfw: Boolean })

let api = {}

api.getUserAccess= async (userid) => {
    let user = await User.findOne({id: userid})
    if (!user) return 0
    return user.access
}

api.setUserAccess = async (userid, lvl) => {
    let user = await User.findOne({id: userid}).exec()
    lvl = Number(lvl)

    if (user) {
        user.access = lvl
        user.save()
    } else {
        user = new User({id: userid, access: lvl})
        user.save()
    }
}

api.setGroupNsfw = async (peerid, state) => {
    let group = await Group.findOne({id: peerid}).exec()
    state = Boolean(state)

    if (group) {
        group.nsfw = state
        group.save()
    } else {
        group = new Group({id: peerid, nsfw: state})
        group.save()
    }
}

api.hasGroupNsfwTo = async (peerid) => {
    let group = await Group.findOne({id: peerid}).exec()

    if (!group) {
        return false
    }

    if (group.nsfw == true) {
        return true
    } else {
        return false
    }
}



api.hasUserPermissionTo = async (userid, lvl) => {
    let user = await User.findOne({id: userid}).exec()

    if (!user) {
        return false
    }

    if (user.access == -1) {
        return true
    }

    if (user.access >= lvl) {
        return true
    } else {
        return false
    }
}

module.exports = api