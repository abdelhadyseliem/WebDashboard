const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
    guildId: {
        type: String,
    },
    IsEnabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    MembersChannelId: {
        type: String,
    },
    ModChannelId: {
        type: String,
    },
    ServerChannelId: {
        type: String,
    },
})

module.exports = model('Logging', LogSchema);