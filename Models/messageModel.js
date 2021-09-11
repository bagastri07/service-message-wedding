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
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', message)