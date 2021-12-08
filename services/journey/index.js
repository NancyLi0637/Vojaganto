const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { User, Journey, Posting } = require("../../models")
const postingService = require('../posting')
const returnedJourneyField = ["_id", "title", "author", "color", "journeyPostings"]

class JourneyService {

     /** Helper function that turns the journey data to its returned form
     * 
     * @param {string} user The user id of the current logged in user (for priviledge check) 
     * @param {Object} journey The journey information object 
     * @param {boolean} meta If the returned form should be only meta information of the journey or a detailed information including the posting information
     * @returns The required return object of the given journey information
     */
    async getReturnedJourneyField(user, journey, meta=false) {
        let res = {
            _id: journey._id.toString(),
            title: journey.title,
            color: journey.color,
            author: journey.author
        }
    
        if (!meta) {
        //res.journeyPostings = await postingService.getAllPosting(null, journey._id)
            let allResPosting = await Posting.find({"journey": journey._id, "author": journey.author}).exec()
            // Check for priviledge
            if (user !== journey.author){ 
                allResPosting = allResPosting.filter((posting) => {
                    return posting.public === true
                })
            }

            // Get the output return in the appropriate data structure
            res.journeyPostings = []
            for (let eachPosting of allResPosting){
                res.journeyPostings.push(await postingService.getReturnedPostingField(eachPosting))
            }


        }
        return res
    }

    /** Retrieve the journey according to the journey id
     * 
     * @param {string} userId The user id of the current logged in user (for priviledge check) 
     * @param {string} journeyId The journey id of the journey required
     * @param {boolean} meta If the returned data should be only a meta data or a detailed data
     * @returns The journey information of the required journey
     *          If the journey was not found, return "journey not found"
     */
    async getJourney(userId, journeyId, meta=false) {
        // Get the journey
        const journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "journey not found"
        }
        // Turn the journey into a return data structure
        const res = await this.getReturnedJourneyField(userId, journey, meta)

        logger.log(`Get journey [${journey.title}]`)
        return res
    }

    /**Update the journey according to the journey id
     * 
     * @param {string} userId The user id of the currently logged in user (for priviledge check)
     * @param {string} journeyId The journey id of the journey that needs to be updated
     * @param {object} data The update information of the journey
     * @returns The object information of the updated journey
     *          If the journey is not found, return "journey not found"
     *          If the user does not have priviledge of performing the action, return "unauthorized"
     */
    async updateJourney(userId, journeyId, data) {
        // Get the journey to check for priviledge check from author
        let journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "journey not found"
        }
        if (journey.author !== userId) {
            return "unauthorized"
        }
        // Update the user
        let updatedjourney = await Journey.findByIdAndUpdate(journeyId, data, { new: true }).exec()
        let res = await this.getReturnedJourneyField(userId, updatedjourney)
        logger.log(`Update journey [${updatedjourney.title}]`)
        return res
    }


    /**Delete the journey according to the journey id given (and change all its postings to have the default journey)
     * 
     * @param {string} userId The user id of the currently logged in user (for priviledge check)
     * @param {string} journeyId The journey id of the journey that needs to be deleted
     * @returns The deleted journey object information
     *          If the journey is not found, return "journey not found"
     *          If the user does not have priviledge of performing the action, return "unauthorized"
     *          If the user is trying to delete the default journey, return "default journey"
     */
    async deleteJourney(userId, journeyId) {
        // Get the journey for priviledge check
        let journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "journey not found"
        }
        if (journey.author !== userId) {
            return "unauthorized"
        }
        // Check if the journey is the default journey of the user
        let author = await User.findById(journey.author).exec()
        if (author.defaultJourney === journey._id.toString()){
            return "default journey"
        }
        // Delete the journey
        let deletedJourney = await Journey.findByIdAndRemove(journeyId).exec()
        let res = await this.getReturnedJourneyField(userId, deletedJourney)
        // Update all its journey postings to be in default journey
        let posting = await Posting.find({ "journey": deletedJourney._id}).exec()
        for (let eachPosting of posting) {
            // Find the default journey and set each posting to the default journey
            let currUser = await User.findById(eachPosting.author).exec()
            if (currUser){
                eachPosting.journey = currUser.defaultJourney
                await Posting.findByIdAndUpdate(eachPosting._id, eachPosting).exec()    
            }
        }
        logger.log(`Delete journey [${deletedJourney.title}]`)
        return res

    }

}
const service = new JourneyService()

module.exports = service

