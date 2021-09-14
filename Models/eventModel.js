const mongoose = require('mongoose')
const Schema = mongoose.Schema

const event = {
    name: {
        type: String,
        required: true,
    },
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }]
}

module.exports = mongoose.model('Event', event)