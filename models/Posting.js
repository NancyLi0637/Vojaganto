const mongoose = require('mongoose')

const Posting = mongoose.model('Posting', {
    // Title of 
    title: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    // User defined destination
    destination: {
        type: String,
        required: true,
        trim: true
    },
    // For map
    coordinates: {
        type: Array
    },
    // user._id
    author: {
        type: String,
        required: true,
    },
    // journey._id
    journey: {
        type: String,
        trim: true
    },
    // User defined date
    date: {
        type: Date,
    },
    // Body/content
    body: {
        type: String,
    },
    // Array of url
    images: {
        type: Array
    },
    // If the posting is public
    public: {
        type: Boolean
    },
    // Fixed, unchanged
    createdTime: {
        type: Date,
    },
})

module.exports = { Posting }