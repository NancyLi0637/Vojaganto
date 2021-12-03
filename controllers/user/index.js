const logger = { log: console.log }
const userService = require("../../services/user")

class UserController {

    async getUsers(req) {
        const search = req.query.search || ""

        const resultUsers = []
        // Build query for users
        for (let key of ["username", "name", "convertedId"]) {
            let filter = {}
            filter[key] = new RegExp(".*" + search + ".*", "i")
            let queriedUsers = await userService.getUsers(filter, {})
            console.log(queriedUsers)

            queriedUsers.forEach(user => {
                // If user already in the result, then not adding it again
                if (!resultUsers.some(e => e.username === user.username)) {
                    resultUsers.push(user)
                }
            })
        }

        return resultUsers
    }

    async getUser(req) {
        const uid = req.params._id

        if (!uid) {
            throw { msg: "Unsatisfied: Missing field in request body" }
        }
        console.log(uid)
        const user = await userService.getUser(uid)

        if (!user) {
            throw { msg: "Not Found: User doesn't exist" }
        }

        return user
    }

    async updateUser(req) {
        const body = req.body
        const availableField = ["password", "name", "description", "avatar"]
        const data = {}

        for (let key of Object.keys(body)) {
            if (availableField.indexOf(key) < 0) {
                throw { msg: `Forbidden: [${key}] doesn't exist or can not be modified` }
            }
            data[key] = body[key]
        }

        const modifiedUser = await userService.updateUser(req.session.user, data)

        return modifiedUser
    }

    async updateUserAdmin(req) {
        const body = req.body
        const operateUser = req.user
        const availableField = ["password", "name", "description", "active", "avatar", "role"]
        let uid = req.params._id
        let data = {}

        for (let key of Object.keys(body)) {
            if (availableField.indexOf(key) < 0) {
                throw { msg: `Forbidden: [${key}] doesn't exist or can not be modified` }
            }

            data[key] = body[key]
        }

        if (uid === null) {
            throw { msg: `Unsatisfied: Missing field in request body` }
        }

        let modifiedUser = await userService.updateUser(uid, data)

        return modifiedUser
    }

    async createUser(req) {
        const body = req.body
        const requiredField = ["username", "password", "name"]
        const optionalField = ["description", "avatar"]
        const data = {}

        for (let field of requiredField) {
            let value = body[field]
            if (!value) {
                console.log(field)
                throw { msg: `Unsatisfied: Missing field in request body` }
            }
            data[field] = value
        }

        for (let field of optionalField) {
            let value = body[field]
            if (!value) {
                continue
            }
            data[field] = value
        }

        data.role = "client"
        data.active = true
        if (!data.description) {
            data.description = "This user doesn't have any description..."
        }

        let checkUsers = await userService.getUsers({ "username": data.username }, {})

        if (checkUsers.length !== 0) {
            throw { msg: "Forbidden: Username already taken!" }
        }

        let newUser = await userService.createUser(data)

        return newUser
    }

    async login(req) {
        let username = req.body.username
        let password = req.body.password

        if (!username || !password) {
            throw { msg: `Unsatisfied: Missing field in request body` }
        }

        let loginInfo = await userService.login(username, password)

        return loginInfo
    }

    // =========================================================New Journey Feature======================================
    async getUserJourney(req){
        let uid = req.params._id
        if(!uid){
            throw { msg: `Unsatisfied: Missing field in request body`}
        }

        let user = await userService.getUserJourney(uid)

        if (!user){
            throw { msg: `Failed: Internal Server Error`}
        }

        return user
    }

    async _getJourneyData(journeyBody, requiredField, optionalField){
        let data = {}
        for(let eachRequiredField of requiredField){
            if (!(Object.keys(journeyBody).includes(eachRequiredField))){
                
                throw { msg:`Unsatisfied: Missing field [${eachRequiredField}]in request body`}
            
            } else {
                data[eachRequiredField] = journeyBody[eachRequiredField]
            }
        }
        for (let eachOptionalField of optionalField){
            if (!(Object.keys(journeyBody).includes(eachOptionalField))){
                data[eachOptionalField] = null
            } else {
                data[eachOptionalField] = journeyBody[eachOptionalField]
            }
        }
        return data

    }

    async createUserJourney(req){
        const journeyBody = req.body
        const requiredField = ["title", "author"]
        const optionalField = ["color"]
        let data = await this._getJourneyData(journeyBody, requiredField, optionalField)
        if (req.session.user !== data["author"]){
            throw { msg: `Unauthorized: User can not create the journey`}
        }
        let journey = await userService.createUserJourney(data)
        if (!journey){
            throw { msg: `Failed: Journey can not be created due to internal server error`}
        } else if (journey === "repeat"){
            throw { msg: `Repeat: The title has been used for a journey title`}
        }
        return journey


    }

    async getUserPosting(req){
        let uid = req.params._id
        if(!uid){
            throw { msg: `Unsatisfied: Missing field in request body`}
        }

        let user = await userService.getUserPosting(uid)

        if (!user){
            throw { msg: `Failed: Internal Server Error`}
        }

        return user
    }
}

const controller = new UserController

module.exports = controller

