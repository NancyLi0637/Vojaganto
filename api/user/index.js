const router = require('express').Router()
const { authenticate, checkAdmin } = require("../../util/authentication")
const userController = require('../../controllers/user')
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

router.get("/:_id", async (req, res) => {
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
        let user = await userController.createUser(req)
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
// =========================================================New Journey Feature======================================
router.get("/:_id/journey", authenticate, async(req, res) => {
    try{
        let journey = await userController.getUserJourney(req)
        res.status(200).send(journey)
    } catch (error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.post("/:_id/journey", authenticate, async(req, res) => {
    try{
        let journey = await userController.createUserJourney(req)
        res.status(200).send(journey)
    } catch (error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.get("/:_id/posting", authenticate, async(req, res) => {
    try{
        let posting = await userController.getUserPosting(req)
        res.status(200).send(posting)
    } catch (error){
        logger.log(error)
        res.status(400).send(error)
    }
})

module.exports = router