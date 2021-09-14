const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    message: {
        type: String,
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    }
}, {timestamps: {createdAt: true, updatedAt: false}})

module.exports = mongoose.model('Message', message)