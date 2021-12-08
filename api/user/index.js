const router = require('express').Router()
const { authenticate, checkAdmin } = require("../../util/authentication")
const userController = require('../../controllers/user')
const logger = { log: console.log }
const errorProcess = require("../../util/errorProcess")
const multer = require('multer')
const upload = multer({ dest: 'files/' })
const avatarReceiver = upload.single("avatar")

router.post("/login", async (req, res) => {
    try {
        let user = await userController.login(req)
        req.session.user = user._id.toString()
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})

router.put("/logout", authenticate, async (req, res) => {
    req.session.user = null
    req.session.destroy(err => {
        if (err) {
            res.status(500).send({msg: "Internal Server Error"})
        } else {
            res.status(200).send({ msg: "OK" })
        }
    })
})

router.get("/:_id", async (req, res) => {
    try {
        let user = await userController.getUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})

router.put("/:_id", authenticate, avatarReceiver , async (req, res) => {
    try {
        let user = await userController.updateUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})

router.post("/", avatarReceiver , async (req, res) => {
    console.log(req)
    try {
        let user = await userController.createUser(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})

router.get("/session/resume", authenticate, async (req, res) => {
    let user = {}
    user.role = req.user.role
    user.username = req.user.username
    user._id = req.user.convertedId
    res.status(200).send(user)
})

router.get("/:_id/journey", async(req, res) => {
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

router.get("/:_id/posting", async(req, res) => {
    try{
        let posting = await userController.getUserPosting(req)
        res.status(200).send(posting)
    } catch (error){
        logger.log(error)
        res.status(400).send(error)
    }
})

module.exports = router