const { User } = require('../models/User')

/**
 * Check the request sender is logged in.
 * 
 * Reference: From lecture code
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send({ msg: "Unauthorized" })
        })
    } else {
        res.status(401).send({ msg: "Unauthorized" })
    }
}


/**
 * Check the request sender has a role of admin.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next()
    } else {
        res.status(403).send({ msg: "Forbidden" })
    }
}


module.exports = {
    authenticate,
    checkAdmin
}