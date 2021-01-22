const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Users', UserSchema);