const mongoose = require('mongoose')

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

    avatar: {
        type: String,
    },

    role: {
        type: String,
        default: "client"
    },

    lastLogin: {
        type: Date
    },

    convertedId: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User