const router = require('express').Router()
const authenticate = require("../../util/authentication")
const createUserController = require('../../controllers/user')
const userController = createUserController()
const logger = { log: console.log }

router.post("/login", async (req, res) => {
    try {
        let info = await userController.login(req)
        req.session.user = info.id.toString()
        res.status(200).send(info.user)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/logout", authenticate, async (req, res) => {
    req.session.user = undefined
    res.status(200).send()
})

router.get("/:_id", authenticate, async (req, res) => {
    try {
        let user = await userController.getUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/:_id", authenticate, async (req, res) => {
    try {
        let user = await userController.updateUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

router.post("/", async (req, res) => {
    try {
        let user = await userController.creatUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})

router.get("/session/resume", authenticate, async (req, res) => {
    let user = {}
    user.role = req.user.role
    user.username = req.user.username
    user._id = req.user.convertedId
    res.status(200).send(user)
})

module.exports = router