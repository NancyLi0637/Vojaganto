const router = require('express').Router()
const authenticate = require("../../util/authentication")
const createJourneyController = require('../../controllers/journey')
const journeyController = createJourneyController()
const logger = { log: console.log }

router.get("/:_id", authenticate, async (req, res) => {
    try{
        let journey = await journeyController.getJourney(req)
        res.status(200).send(journey)
    } catch (error){
        logger.log(error)
        res.status(400).send(error)
    }
})

router.put("/:_id", authenticate, async (req, res) => {
    try{
        let journey = await journeyController.updateJourney(req)
        res.status(200).send(journey)
    } catch (error){
        logger.log(errpr)
        res.status(400).send(error)
    }
})

router.delete("/:_id", authenticate, async (req, res) => {
    try{
        let journey = await journeyController.deleteJourney(req)
        res.status(200).send(journey)
    } catch (error){
        logger.log(errpr)
        res.status(400).send(error)
    }
})

module.exports = router




