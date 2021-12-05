const mongoose = require('mongoose')

// Refrence to given code in piazza
const ImageSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = ImageSchema