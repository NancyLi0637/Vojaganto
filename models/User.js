const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

    avatar: {
        type: String,
    },

    active: {
        type: Boolean,
        default: true,
    },

    role: {
        type: String,
    }
})


/**
 * Middleware: Encrypt password.
 * Reference: Lecture code
 */
UserSchema.pre('save', (next) => {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err)
                next()
            } else {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err)
                        next()
                    } else {
                        user.password = hash
                        next()
                    }
                })
            }
        })
    } else {
        next()
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }