const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { User } = require("../../models/User")
const { Journey } = require("../../models/Journey")
const { Posting } = require("../../models/Posting")
const returnedField = ["username", "name", "description", "active", "avatar", "role", "lastLogin", "_id"]
const returnedJourneyField = ["_id", "title", "color", "author", "journeyPostings"]
class UserService {

    async getUsers(filter, sort) {
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


    async _getReturnedPostingField(posting){
        const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey","date", "body", "images", "public", "createdTime"]
        let res = {}
        for (let key of returnedField) {
            if (key === "coordinates"){
                if (posting[key].length === 2 && typeof(posting[key][0]) === "number" && typeof(posting[key][1]) === "number"){
                    res["latitude"] = posting[key][0]        
                    res["longitude"] = posting[key][1]            
                } else {
                    res["latitude"] = null
                    res["longitude"] = null           
                }
            } else if (key === "journey"){
                if (!posting[key]){
                    res[key] = null
                } else {
                    let journey = await Journey.findById(posting[key]).exec()
                    if (!journey){
                        res[key] = null
                    } else {
                        let resJourneyObject = {}
                        resJourneyObject["_id"] = journey._id
                        resJourneyObject["title"] = journey.title
                        res[key] = resJourneyObject
                    }
                }
            } else {
                res[key] = posting[key]
            }
        }
        return res
    }

    async _getReturnedJourneyField(journey){
        let res = {}
        for (let key of returnedJourneyField) {
            if (key === "journeyPostings"){
                let posting = await Posting.find({"journey": journey["_id"]}).exec()
                res["journeyPostings"] = []
                for (let eachPosting of posting){
                    let currPosting = await this._getReturnedPostingField(eachPosting)                        
                    res["journeyPostings"].push(currPosting)
                }
        
            } else {
                res[key] = journey[key]
            }
        }
        return res
    }


    async getUserJourney(uid){
        let allJourney = await Journey.find({"author": uid}).exec()
        if (!allJourney){
            return null
        }
        let userJourney = []
        for (let eachJourney of allJourney){
            userJourney.push(await this._getReturnedJourneyField(eachJourney))
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
        let res = await this._getReturnedJourneyField(createdJourney)
        logger.log(`Create Journey [${createdJourney.title}]`)
        return res
 
    }

    async getUserPosting(uid){
        let allJourney = await Journey.find({"author": uid}).exec()
        let res = {}
        for (let eachJourney of allJourney){
            let currJourney = await this._getReturnedJourneyField(eachJourney)
            res[eachJourney.title] = currJourney
        }
        logger.log(`Get user posting`)
        return res

    }
}


const userService = new UserService()

module.exports = userService
