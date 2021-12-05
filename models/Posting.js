const mongoose = require('mongoose')
const ImageSchema = require('./Image')

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
    // Array of images
    images: [ImageSchema],

    // Fixed, unchanged
    createdTime: {
        type: Date,
    },
})

module.exports = { Posting }