const logger = { log: console.log }
const userService = require("../../services/user")
const imageProcess = require("../../util/imageProcess")
const fs = require("fs")

class UserController {

    /**
     * Process API request and get the users the client wants
     * @param {Object} req the request message from API call
     * @returns An array of user object
     */
    async getUsers(req) {
        const search = req.query.search || ""

        const resultUsers = []
        // Build query for users
        for (let key of ["username", "name", "convertedId"]) {
            let filter = {}
            filter[key] = new RegExp(".*" + search + ".*", "i")
            let queriedUsers = await userService.getUsers(filter, {})

            queriedUsers.forEach(user => {
                // If user already in the result, then not adding it again
                if (!resultUsers.some(e => e.username === user.username)) {
                    resultUsers.push(user)
                }
            })
        }

        return resultUsers
    }

    /**
     * Process API request and get the user client wants
     * @param {Object} req the request message from API call
     * @returns a user object
     */
    async getUser(req) {
        const uid = req.params._id

        if (!uid) {
            throw { msg: "Unsatisfied: Missing field in request body", status: 406}
        }
        const user = await userService.getUser(uid)

        if (!user) {
            throw { msg: "Not Found: User doesn't exist", status: 404 }
        }

        return user
    }

    /**
     * Process API request and update the given user in the given way
     * @param {Object} req the request message from API call
     * @returns the updated user object 
     */
    async updateUser(req) {
        const body = req.body
        const availableField = ["password", "name", "description"]
        const data = {}

        for (let key of Object.keys(body)) {
            if (availableField.indexOf(key) < 0) {
                throw { msg: `Forbidden: [${key}] doesn't exist or can not be modified`, status: 403 }
            }
            data[key] = body[key]
        }

        if(req.file){
            let oldAvatar = (await userService.getUser(req.session.user)).avatar
            await imageProcess.deleteImage([oldAvatar])
            let avatar = await imageProcess.toObject([req.file.path])
            data.avatar = avatar[0]
            await fs.promises.rm(req.file.path)
        }

        const modifiedUser = await userService.updateUser(req.session.user, data)

        return modifiedUser
    }

    /**
     * Process API request and update the given user in given way.
     * This function can only be used by admin users
     * @param {Object} req the request message from API call
     * @returns the updated user object
     */
    async updateUserAdmin(req) {
        const body = req.body
        const availableField = ["password", "name", "description", "active", "avatar", "role"]
        let uid = req.params._id
        let data = {}

        for (let key of Object.keys(body)) {
            if (availableField.indexOf(key) < 0) {
                throw { msg: `Forbidden: [${key}] doesn't exist or can not be modified`, status: 403 }
            }

            data[key] = body[key]
        }

        if (uid === null) {
            throw { msg: `Unsatisfied: Missing field in request body`, status: 406}
        }

        let oldUser = await userService.getUser(uid)

        if (!oldUser){
            throw { msg: `Not Found: The user modified is not found`, status: 404 }
        }

        let modifiedUser = await userService.updateUser(uid, data)

        return modifiedUser
    }

    /**
     * Process API request and create a new user with given data
     * @param {Object} req the request message from API call
     * @returns the created user object
     */
    async createUser(req) {
        const body = req.body
        const requiredField = ["username", "password", "name"]
        const optionalField = ["description"]
        const data = {}
        console.log(body)

        for (let field of requiredField) {
            let value = body[field]
            if (!value) {
                throw { msg: `Unsatisfied: Missing field in request body`, status: 406 }
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

        if(req.file){
            let avatar = await imageProcess.toObject([req.file.path])
            data.avatar = avatar[0]
            await fs.promises.rm(req.file.path)
        }else{
            data.avatar = undefined
        }

        data.role = "client"
        data.active = true
        if (!data.description) {
            data.description = "This user doesn't have any description..."
        }

        let checkUsers = await userService.getUsers({ "username": data.username }, {})

        if (checkUsers.length !== 0) {
            throw { msg: "Forbidden: Username already taken!", status: 403 }
        }

        let newUser = await userService.createUser(data)

        return newUser
    }

    /**
     * Check if the request can log into an account
     * @param {Object} req the request message from API call
     * @returns the user object that can be logged into
     */
    async login(req) {
        let username = req.body.username
        let password = req.body.password

        if (!username || !password) {
            throw { msg: `Unsatisfied: Missing field in request body`, status: 406 }
        }

        let user = await userService.login(username, password)

        return user
    }
}

const controller = new UserController

module.exports = controller