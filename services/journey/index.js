const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { User, Journey, Posting } = require("../../models")
const postingService = require('../posting')
const returnedJourneyField = ["_id", "title", "author", "color", "journeyPostings"]

class JourneyService {
    async _getReturnedJourneyField(journey, meta=false) {
        const res = {
            _id: journey._id.toString(),
            title: journey.title,
            color: journey.color,
            author: journey.author
        }

        if (!meta) {
            res.journeyPostings = await postingService.getAllPosting(null, journey._id)
        }
        return res
    }

    async getJourney(journeyId, meta=false) {
        if (!ObjectId.isValid(journeyId)) {
            return null
        }

        const journey = await Journey.findById(journeyId).exec()
        if (!journey) {
            return null
        }

        const res = await this._getReturnedJourneyField(journey, meta)

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
        let res = await this._getReturnedJourneyField(updatedjourney)
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
        let res = await this._getReturnedJourneyField(deletedJourney)
        let posting = await Posting.find({ "journey": journeyId, "author": deletedJourney.author }).exec()
        for (let eachPosting of posting) {
            eachPosting.journey = null
            await Posting.findByIdAndUpdate(eachPosting._id, eachPosting).exec()
        }
        logger.log(`Delete journey [${deletedJourney.title}]`)
        return res

    }

}
const service = new JourneyService()

module.exports = service

