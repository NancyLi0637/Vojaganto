const mongoose = require('mongoose')
const ImageSchema = require('./Image')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true,
    },

    avatar: ImageSchema,

    role: {
        type: String,
        default: "client"
    },

    lastLogin: {
        type: Date
    },

    convertedId: {
        type: String
    }, 
    // The default journey id of the user
    defaultJourney: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User