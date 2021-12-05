const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { User, Journey, Posting } = require("../../models")
const postingService = require('../posting')
const returnedJourneyField = ["_id", "title", "author", "color", "journeyPostings"]

class JourneyService {
    /** Helper function that turns the journey data to its returned form
     * 
     * @param {*} journey 
     * @param {*} meta 
     * @returns 
     */
    async getReturnedJourneyField(journey, meta=false, author="") {
        let res = {}
        if (!journey){
            res = {
                title: "unnamed journey",
                author: author
            }
            if (!meta){
                res.journeyPostings = await Posting.find({"journey": "", "author": author}).exec()
            }
        } else {
            res = {
                _id: journey._id.toString(),
                title: journey.title,
                color: journey.color,
                author: journey.author
            }

            if (!meta) {
            //TODO: Check this part: Changed the part below because the input of a journey will be the title, not the _id
            //res.journeyPostings = await postingService.getAllPosting(null, journey._id)
                res.journeyPostings = await Posting.find({"journey": journey.title, "author": journey.author}).exec()

            }
        }
        return res
    }

    async getJourney(journeyId, meta=false) {

        const journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "journey not found"
        }

        const res = await this.getReturnedJourneyField(journey, meta)

        logger.log(`Get journey [${journey.title}]`)
        return res
    }

    async updateJourney(user, journeyId, data) {
        let journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "not found"
        }
        if (journey.author !== user) {
            console.log(journey.author)
            console.log(user)

            return "unauthorized"
        }
        let updatedjourney = await Journey.findByIdAndUpdate(journeyId, data, { new: true }).exec()
        let res = await this.getReturnedJourneyField(updatedjourney)
        logger.log(`Update journey [${updatedjourney.title}]`)
        return res
    }

    async deleteJourney(user, journeyId) {
        let journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return "not found"
        }
        if (journey.author !== user) {
            return "unauthorized"
        }
        let deletedJourney = await Journey.findByIdAndRemove(journeyId).exec()
        let res = await this.getReturnedJourneyField(deletedJourney)
        let posting = await Posting.find({ "journey": journeyId, "author": deletedJourney.author }).exec()
        for (let eachPosting of posting) {
            eachPosting.journey = ""
            await Posting.findByIdAndUpdate(eachPosting._id, eachPosting).exec()
        }
        logger.log(`Delete journey [${deletedJourney.title}]`)
        return res

    }

}
const service = new JourneyService()

module.exports = service

