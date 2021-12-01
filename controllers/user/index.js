const logger = { log: console.log }
const createUserService = require("../../services/user")

class UserController {
    constructor() {
        this.userService = createUserService()
    }

    async getUsers(req) {
        const query = req.query
        const filter = {}
        const sort = {}
        const availiableField = ["username", "name", "_id", "role", "sortField", "sortDirection"]

        for (let key of Object.keys(query)) {
            if (availiableField.indexOf(key) < 0) {
                throw `Forbidden: Unavailiable parameter [${key}]`
            }

            if (key === "sortField") {
                sort[query.sortField] = query.sortDirection || 1
            }

            if (key === "sortDirection") {
                continue
            }

            if (key === "_id"){
                filter.convertedId = new RegExp(".*" + query[key] + ".*", "i")
                continue
            }

            filter[key] = new RegExp(".*" + query[key] + ".*", "i")
        }

        let users = await this.userService.getUsers(filter, sort)

        return users
    }

    async getUser(req) {
        const uid = req.body._id

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
        const availiableField = ["_id", "password", "name", "description", "active", "avatar", "role"]
        let uid = null
        let data  = {}

        if (operateUser.role !== "admin"){
            throw "Unauthorized"
        }

        for (let key of Object.keys(body)) {
            if (availiableField.indexOf(key) < 0) {
                throw `Forbidden: [${key}] doesn't exist or can not be modified`
            }

            if (key === "_id"){
                uid = body[key]
                continue
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
}

module.exports = () => {
    const userController = new UserController()
    return userController
}