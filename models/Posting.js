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
        type: Number,
        default: -1
    },
    longitude: {
        type: Number,
        default: -1
    },
    // user._id
    author: {
        type: String,
        required: true,
        default: ""
    },
    // journey._id
    journey: {
        type: String,
        trim: true,
        default: "-1"
    },
    // User defined date
    date: {
        type: Date,
        //TODO: default 
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