const router = require('express').Router()
const authenticate = require("../../util/authentication")
const createPostingController = require('../../controllers/posting')
const postingController = createPostingController()
const logger = { log: console.log }

router.get("/", authenticate, async (req, res) => {
    try {
        let posting = await postingController.getAllPosting(req)
        res.status(200).send(posting)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})


router.get("/:id", authenticate, async (req, res) => {
    try{
        let posting = await postingController.getOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.post("/", authenticate, async (req, res) => {
    try{
        let posting = await postingContoller.createOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/:id", authenticate, async (req, res) => {
    try{
        let posting = await postingContoller.changeOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }    
})


router.delete("/:id", authenticate, async(req, res) => {
    try{
        let posting = await postingContoller.deleteOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }    
})


module.exports = router