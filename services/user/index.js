const logger = { log: console.log }
const imageProcess = require("../../util/imageProcess")
const bcrypt = require("bcrypt")
const { User, Journey, Posting } = require("../../models")
const journeyService = require("../journey")
const postingService = require("../posting")

class UserService {

    /**
     * privative function to change the user into return style
     * @param {User} user 
     * @returns same user object as input but remove password
     */
    _returnStyle(user) {
        let updatedUser = {}
        for (let key of Object.keys(user)) {
            if (key !== "password") {
                updatedUser[key] = user[key]
            }
        }
        return updatedUser
    }

    /**
     * get all users in the database which satisfy the given filter and sorted in the given way
     * @param {Object} filter the filter on users used in search 
     * @param {Object} sort the field to sort and the direction of sort to sort the result user list
     * @returns an array of User object
     */
    async getUsers(filter, sort) {
        let users = await User.find(filter).sort(sort).exec()
        let results = []
        for (let user of users) {
            let result = this._returnStyle(user._doc)
            results.push(result)
        }
        logger.log("Get All Users")
        return results
    }

    /**
     * Search a user in the database by its id
     * @param {String} uid the _id of the user wanted
     * @returns a User object
     */
    async getUser(uid) {
        let user = await User.findById(uid).exec()
        let result = this._returnStyle(user._doc)
        logger.log(`Get User [${user.username}]`)
        return result
    }

    /**
     * Encrypt password when create or modify user object in database
     * @param {String} password 
     * @returns the encrypted password
     */
    async _encrypt(password) {
        let salt = await bcrypt.genSalt()
        let encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }

    /**
     * Update a user's data in the database
     * @param {String} uid the id of user that needs modified
     * @param {Object} data the modified data of the user
     * @returns The modified user object
     */
    async updateUser(uid, data) {
        if (data.password) {
            data.password = await this._encrypt(data.password)
        }
        // Validate if the new journey is valid
        // NOTE: the input of a defaultJourney should be a journey id that is already created
        if (data.defaultJourney) {
            let newDefaultJourney = await Journey.findById(data.defaultJourney).exec()
            if (!newDefaultJourney) {
                return "journey not found"
            }
        }

        let user = await User.findByIdAndUpdate(uid, data, { new: true }).exec()
        let result = this._returnStyle(user._doc)
        logger.log(`Modify User [${user.username}]`)
        return result
    }

    /**
     * Create a new user in the database
     * @param {Object} data the data needed to create a user
     * @returns the created user object 
     */
    async createUser(data) {
        data.password = await this._encrypt(data.password)
        let newUser = new User(data)
        let createdUser = await newUser.save()
        // Create the default journey for the user, and then update the user to have that default journey
        let userDefaultJourney = await this.createUserJourney(createdUser._id, {
            "title": "Unnamed Journey",
            "author": createdUser._id
        })

        createdUser = await User.findByIdAndUpdate(createdUser._id, { convertedId: createdUser._id.toString(), defaultJourney: userDefaultJourney._id })
        logger.log(`Create User [${createdUser.username}]`)
        let result = this._returnStyle(createdUser._doc)
        return result
    }

    /**
     * Check if the given username and password can login to a user account in database
     * @param {String} username 
     * @param {String} password 
     * @returns the user object that can be logged into by gievn username and password
     */
    async login(username, password) {
        let user = await User.findOne({ username: username }).exec()
        if (!user) {
            throw { msg: "Login Failed! Username not found!", status: 400 }
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw { msg: "Login Failed! Please check your username and password!", status: 400 }
        }
        if (!user.active) {
            throw { msg: "Login Failed! This account is currently banned", status: 403 }
        }
        user = await User.findByIdAndUpdate(user._id, { lastLogin: Date.now() }, { new: true }).exec()
        logger.log(`Login User [${user.username}]`)
        let result = this._returnStyle(user._doc)
        return result
    }
    // =========================================================New Journey Feature======================================





    async getUserJourney(userId, uid) {
        // Find all the journeys of the user
        let allJourney = await Journey.find({ "author": uid }).exec()

        // Return the result journey in the appropriate data structure
        let userJourney = []
        for (let eachJourney of allJourney) {
            userJourney.push(await journeyService.getReturnedJourneyField(userId, eachJourney))
        }
        logger.log(`Get user journey`)
        return userJourney

    }

    async createUserJourney(userId, data) {
        // Check if the journey name already exist
        let currJourney = await Journey.find({ "title": data["title"], "author": data["author"] }).exec()
        if (currJourney.length > 0) {
            return "repeat"
        }
        // Create the journey
        let newJourney = new Journey(data)
        let createdJourney = await newJourney.save()
        // QUESTION: What is convertedID doing here?
        let res = await journeyService.getReturnedJourneyField(userId, createdJourney)
        logger.log(`Create Journey [${createdJourney.title}]`)
        return res

    }

    async getUserPosting(userId, uid) {
        // Get all the journey of the user
        let allJourney = await Journey.find({ "author": uid }).exec()
        // Return the appropriate data strcture (contianing all the postings for the journey)
        let res = []
        for (let eachJourney of allJourney) {
            let currJourney = await journeyService.getReturnedJourneyField(userId, eachJourney)
            res.push(currJourney)
        }
        logger.log(`Get user posting`)
        return res

    }
}


const userService = new UserService()

module.exports = userService
