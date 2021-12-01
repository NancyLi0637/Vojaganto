const router = require('express').Router()
const authenticate = require("../../util/authentication")
const createUserController = require('../../controllers/user')
const userController = createUserController()
const logger = { log: console.log }

router.get("/user", authenticate, async (req, res) => {
    if (req.user.role !== "admin"){
        logger.log("Unauthorized")
        res.status(400).send("Unauthorized")
        return
    }
    
    try {
        let users = await userController.getUsers(req)
        res.status(200).send(users)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/user", authenticate, async (req, res) => {
    if (req.user.role !== "admin"){
        logger.log("Unauthorized")
        res.status(400).send("Unauthorized")
        return
    }
    try {
        let user = await userController.updateUserAdmin(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

module.exports = router