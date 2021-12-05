const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { User, Journey, Posting } = require("../../models")
const journeyService = require('../journey')
const returnedField = ["username", "name", "description", "active", "avatar", "role", "lastLogin", "_id"]
const returnedJourneyField = ["_id", "title", "color", "author", "journeyPostings"]
class UserService {

    async getUsers(filter, sort={}) {
        let users = await User.find(filter).sort(sort).exec()
        let results = []
        for (let user of users) {
            let result = {}
            for (let key of returnedField) {
                result[key] = user[key]
            }
            result._id = user.convertedId
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
        result._id = user.convertedId
        logger.log(`Get User [${user.username}]`)
        return result
    }

    async _encrypt(password) {
        let salt = await bcrypt.genSalt()
        let encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }

    async updateUser(uid, data) {
        if (data.password) {
            data.password = await this._encrypt(data.password)
        }
        let user = await User.findByIdAndUpdate(uid, data, { new: true }).exec()
        let result = {}
        for (let key of returnedField) {
            result[key] = user[key]
        }
        result._id = user.convertedId
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
        result._id = createdUser._id.toString()
        return result
    }

    async login(username, password) {
        let user = await User.findOne({ username: username }).exec()
        if (!user) {
            throw { msg: "Login Failed! Username not found!" }
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw { msg: "Login Failed! Please check your username and password!" }
        }
        if (!user.active) {
            throw { msg: "Login Failed! This account is currently banned" }
        }
        user = await User.findByIdAndUpdate(user._id, { lastLogin: Date.now() }, { new: true }).exec()
        logger.log(`Login User [${user.username}]`)
        let result = {}
        for (let key of returnedField) {
            result[key] = user[key]
        }
        return { user: result, id: user._id }
    }
    // =========================================================New Journey Feature======================================





    async getUserJourney(uid){
        let allJourney = await Journey.find({"author": uid}).exec()
        if (allJourney.length === 0){
            return "journey not found"
        }
        let userJourney = []
        for (let eachJourney of allJourney){
            userJourney.push(await journeyService.getReturnedJourneyField(eachJourney))
        }
        logger.log(`Get user journey`)
        return userJourney

    }

    async createUserJourney(data){
        let currJourney = await Journey.find({"title": data["title"], "author": data["author"]}).exec()
        if (currJourney.length > 0){
            return "repeat"
        }
        let newJourney = new Journey(data)
        let createdJourney = await newJourney.save()
        // QUESTION: What is convertedID doing here?
        let res = await journeyService.getReturnedJourneyField(createdJourney)
        logger.log(`Create Journey [${createdJourney.title}]`)
        return res
 
    }

    async getUserPosting(uid){

        let allJourney = await Journey.find({"author": uid}).exec()
        if (allJourney.length === 0){
            return "journey not found"
        }
        let res = []
        for (let eachJourney of allJourney){
            let currJourney = await journeyService.getReturnedJourneyField(eachJourney)
            res.push(currJourney)
        }
        // Give input for unnamed journey posting
        res.push(await journeyService.getReturnedJourneyField(null, false, uid))
        logger.log(`Get user posting`)
        return res

    }
}


const userService = new UserService()

module.exports = userService
