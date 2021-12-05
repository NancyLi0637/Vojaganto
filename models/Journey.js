const mongoose = require('mongoose')

const Journey = mongoose.model('Journey', {
    // Title of the journey
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    // Color of map pin
    color: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
})

module.exports = Journey
