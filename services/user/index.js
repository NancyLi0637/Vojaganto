const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { User } = require("../../models/User")
const returnedField = ["username", "name", "description", "active", "avatar", "role", "lastLogin"]

class UserService {

    async getUsers(filter, sort) {
        let users = await User.find(filter).sort(sort).exec()
        let results = []
        for(let user of users){
            let result = {}
            for (let key of returnedField) {
                result[key] = user[key]
            }
            results.push(result)
        }
        logger.log("Get All Users")
        return results
    }

    async getUser(uid) {
        let user = await User.findById(uid).exec()
        let result = {}
        for (let key of returnedField) {
            result[key] = user[key]
        }
        logger.log(`Get User [${user.username}]`)
        return result
    }

    async _encrypt(password) {
        let salt = await bcrypt.genSalt()
        let encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }

    async updateUser(uid, data) {
        if(data.password){
            data.password = await this._encrypt(data.password)
        }
        let user = await User.findByIdAndUpdate(uid, data, { new: true }).exec()
        let result = {}
        for (let key of returnedField) {
            result[key] = user[key]
        }
        logger.log(`Modify User [${user.username}]`)
        return result
    }

    async createUser(data) {
        data.password = await this._encrypt(data.password)
        let newUser = new User(data)
        let createdUser = await newUser.save()
        await User.findByIdAndUpdate(createdUser._id, { convertedId: createdUser._id.toString() })
        logger.log(`Create User [${createdUser.username}]`)
        let result = {}
        for (let key of returnedField) {
            result[key] = createdUser[key]
        }
        return result
    }

    async login(username, password) {
        let user = await User.findOne({ username: username }).exec()
        if (!user) {
            throw "Login Failed! Username not found!"
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw "Login Failed! Please check your username and password!"
        }
        if (!user.active) {
            throw "Login Failed! This account is currently banned"
        }
        user = await User.findByIdAndUpdate(user._id, { lastLogin: Date.now() }, { new: true }).exec()
        logger.log(`Login User [${user.username}]`)
        let result = {}
        for (let key of returnedField) {
            result[key] = user[key]
        }
        return { user: result, id: user._id }
    }
}

module.exports = () => {
    const userService = new UserService()
    return userService
}