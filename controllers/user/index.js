const logger = { log: console.log }
const createUserService = require("../../services/user")

class UserController {
    constructor() {
        this.userService = createUserService()
    }

    async getUsers(req) {
        const search = req.query.search

        if(!search){
            throw "Unsatisfied: Missing field in request query"
        }
        
        const availiableField = ["username", "name", "convertedId"]

        let users = []

        for (let key of availiableField) {
            let filter = {}
            filter[key] = new RegExp(".*" + search + ".*", "i")
            let addOnUsers = await this.userService.getUsers(filter, {})
            console.log(addOnUsers)

            for(let user of addOnUsers){
                let isIn = false
                for(let inUser of users){
                    if (inUser.username === user.username){
                        isIn = true
                    }
                }

                if(isIn){
                    continue
                }

                users.push(user)
            }
        }

        return users
    }

    async getUser(req) {
        const uid = req.params._id

        if(!uid){
            throw "Unsatisfied: Missing field in request body"
        }

        let user = await this.userService.getUser(uid)

        if (!user){
            throw "Not Found: User doesn't exist"
        }

        return user
    }

    async updateUser(req) {
        const body = req.body
        const availiableField = ["password", "name", "description", "avatar"]
        const data = {}
        
        for (let key of Object.keys(body)) {
            if (availiableField.indexOf(key) < 0) {
                throw `Forbidden: [${key}] doesn't exist or can not be modified`
            }
            data[key] = body[key]
        }

        let modifiedUser = await this.userService.updateUser(req.session.user, data)

        return modifiedUser
    }

    async updateUserAdmin(req){
        const body = req.body
        const operateUser = req.user
        const availiableField = ["password", "name", "description", "active", "avatar", "role"]
        let uid = req.params._id
        let data  = {}

        if (operateUser.role !== "admin"){
            throw "Unauthorized"
        }

        for (let key of Object.keys(body)) {
            if (availiableField.indexOf(key) < 0) {
                throw `Forbidden: [${key}] doesn't exist or can not be modified`
            }

            data[key] = body[key]
        }

        if(uid === null){
            throw `Unsatisfied: Missing field in request body`
        }

        let modifiedUser = await this.userService.updateUser(uid, data)

        return modifiedUser
    }

    async creatUser(req) {
        const body = req.body
        const requiredField = ["username", "password", "name"]
        const optionalField = ["description", "avatar"]
        const data = {}

        for(let field of requiredField){
            let value = body[field]
            if(!value){
                throw `Unsatisfied: Missing field in request body`
            }
            data[field] = value
        }

        for(let field of optionalField){
            let value = body[field]
            if(!value){
                continue
            }
            data[field] = value
        }

        data.role = ""
        data.active = true
        if(!data.description){
            data.description = "This user doesn't have any description..."
        }

        let checkUsers = await this.userService.getUsers({"username": data.username}, {})

        if(checkUsers.length !== 0){
            throw "Forbidden: Username already taken!"
        }

        let newUser = await this.userService.createUser(data)

        return newUser
    }

    async login(req) {
        let username = req.body.username
        let password = req.body.password

        if(!username || !password){
            throw `Unsatisfied: Missing field in request body`
        }

        let loginInfo = await this.userService.login(username, password)

        return loginInfo
    }

    // =========================================================New Journey Feature======================================
    async getUserJourney(req){
        let uid = req.params._id
        if(!uid){
            throw "Unsatisfied: Missing field in request body"
        }

        let user = await this.userService.getUserJourney(uid)

        if (!user){
            throw "Failed: Internal Server Error"
        }

        return user
    }

    async _getJourneyData(journeyBody, requiredField, optionalField){
        let data = {}
        for(let eachRequiredField of requiredField){
            if (!(Object.keys(journeyBody).includes(eachRequiredField))){
                
                throw `Unsatisfied: Missing field [${eachRequiredField}]in request body`
            
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
        let data = await _getJourneyData(journeyBody, requiredField, optionalField)
        if (req.session.user._id !== data["author"]){
            throw "Unauthorized: User can not create the journey"
        }
        let journey = await this.userService.createUserJourney(data)
        if (!journey){
            throw "Failed: Journey can not be created due to internal server error"
        } else if (journey === "repeat"){
            throw "Repeat: The title has been used for a journey title"
        }
        return journey


    }

    async getUserPosting(req){
        let uid = req.params._id
        if(!uid){
            throw "Unsatisfied: Missing field in request body"
        }

        let user = await this.userService.getUserPosting(uid)

        if (!user){
            throw "Failed: Internal Server Error"
        }

        return user
    }
}

module.exports = () => {
    const userController = new UserController()
    return userController
}