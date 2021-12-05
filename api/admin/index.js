const router = require('express').Router()
const { authenticate, checkAdmin } = require("../../util/authentication")
const userController = require('../../controllers/user')
const logger = { log: console.log }
const errorProcess = require("../../util/errorProcess")

router.get("/user", authenticate, checkAdmin, async (req, res) => {
    try {
        let users = await userController.getUsers(req)
        res.status(200).send(users)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})

router.put("/user/:_id", authenticate, checkAdmin, async (req, res) => {
    try {
        let user = await userController.updateUserAdmin(req)
        res.status(200).send(user)
    } catch (error) {
        logger.log(error)
        error = errorProcess(error)
        res.status(error.status).send({ msg: error.msg })
    }
})


module.exports = router