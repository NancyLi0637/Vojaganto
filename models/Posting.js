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
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
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
        type: Date
    },
    // Body/content
    body: {
        type: String,
        default: "",
    },
    // Array of url
    images: {
        type: Array,
        default: [],
    },
    // If the posting is public
    public: {
        type: Boolean,
        default: false,
    },
    // Fixed, unchanged
    createdTime: {
        type: Date,
    },
})

module.exports = Posting