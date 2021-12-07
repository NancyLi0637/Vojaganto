const logger = { log: console.log }
const userService = require("../../services/user")
const imageProcess = require("../../util/imageProcess")
const fs = require("fs")
const { ObjectId } = require('mongodb')
const {getAndValidateObjectId, getAndValidateDataBody} = require("../../util/helper")

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

        // Validation
        if (!uid) {
            throw { msg: "Unsatisfied: Missing field in request body" }
        } else if (!ObjectId.isValid(uid)) {
            throw { status: 400, msg: "Bad id" }
        }

        const user = await userService.getUser(uid)

        if (!user) {
            throw { status: 404, msg: "Not Found: User doesn't exist" }
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

        // Only take the available keys
        for (let key of availableField) {
            if (body[key] !== undefined) {
                data[key] = body[key]
            }
        }

        if(req.file){
            let oldAvatar = (await userService.getUser(req.session.user)).avatar
            await imageProcess.deleteImage([oldAvatar])
            let avatar = await imageProcess.toObject([req.file.path])
            data.avatar = avatar[0]
            await fs.promises.rm(req.file.path)
        }

        // Since we can only update the current user
        const uid = req.session.user
        const modifiedUser = await userService.updateUser(uid, data)
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

        // Only take the available keys
        for (let key of availableField) {
            if (body[key] !== undefined) {
                data[key] = body[key]
            }
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

        // Create required fields
        for (let field of requiredField) {
            let value = body[field]
            if (value === undefined) {
                throw { msg: `Unsatisfied: Missing field in request body`, status: 400 }
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
        data.description = data.description || "This user doesn't have any description..."

        // Check if username is valid
        const checkUsers = await userService.getUsers({ "username": data.username })
        if (checkUsers.length !== 0) {
            throw { status: 400, msg: "Bad request: Username already taken!" }
        }

        // Finally, create the user
        const newUser = await userService.createUser(data)
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

    // =========================================================New Journey Feature======================================
    async getUserJourney(req){
        let uid = getAndValidateObjectId(req, "_id")
        let journey = await userService.getUserJourney(req.session.user, uid)

        if (!journey){
            throw { status: 500, msg: `Failed: Internal Server Error`}
        } else if (journey === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey Not Found`}
        }

        return journey
    }


    async createUserJourney(req){
        const data = getAndValidateDataBody(req.body, ["title"], ["color"], req.session.user)
        let journey = await userService.createUserJourney(req.session.user, data)
        if (!journey){
            throw { status: 500, msg: `Failed: Journey can not be created due to internal server error`}
        } else if (journey === "repeat"){
            throw { status: 400, msg: `Unsatisfied: The title has been used for a journey title`}
        }
        return journey


    }

    async getUserPosting(req){
        let uid = getAndValidateObjectId(req, "_id")
        // FIXME: should not require privilege, only check for private
        // if (uid !== req.session.user){
        //     throw { status: 403, msg: `Forbidden: The user does not have access to the posting`}
        // }
        let posting = await userService.getUserPosting(req.session.user, uid)
        if (!posting){
            throw { status: 500, msg: `Failed: Internal Server Error`}
        } else if (posting === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey Not Found`}
        }

        return posting
    }
}

const controller = new UserController

module.exports = controller

