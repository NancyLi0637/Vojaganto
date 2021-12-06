const router = require('express').Router()
const {authenticate, checkAdmin} = require("../../util/authentication")
const postingController = require('../../controllers/posting')
const logger = { log: console.log }
const multer = require('multer')
const upload = multer({ dest: 'files/' })
const imageReceiver = upload.single("image")

router.get("/", async (req, res) => {
    try {
        let posting = await postingController.getAllPosting(req)
        res.status(200).send(posting)
    } catch (error) {
        logger.log(error)
        res.status(400).send(error)
    }
})


router.get("/:_id", async (req, res) => {
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
        let posting = await postingController.createOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/:_id", authenticate, async (req, res) => {
    try{
        let posting = await postingController.changeOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }    
})

router.delete("/image", authenticate, async(req, res) => {
    try{
        let deletedImg = await postingController.deleteImage(req)
        res.status(200).send(deletedImg)
    } catch(error){
        logger.log(error)
        res.status(400).send(error)
    }
})


router.delete("/:_id", authenticate, async(req, res) => {
    try{
        let posting = await postingController.deleteOnePosting(req)
        res.status(200).send(posting)
    }catch(error){
        logger.log(error)
        res.status(400).send(error)
    }    
})

router.post("/image", authenticate, imageReceiver, async(req, res) => {
    try{
        let uploadedImg = await postingController.uploadImage(req)
        res.status(200).send(uploadedImg)
    } catch(error){
        logger.log(error)
        res.status(400).send(error)
    }
})


module.exports = router