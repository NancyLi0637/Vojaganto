const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { User } = require("../../models/User")
const { Journey } = require("../../models/Journey")
const { Posting } = require("../../models/Posting")
const returnedJourneyField = ["_id", "title", "author", "color", "journeyPostings"]
class JourneyService {

    async _getReturnedPostingField(posting){
        const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey","date", "body", "images", "public", "createdTime"]
        let res = {}
        for (let key of returnedField) {
            if (key === "coordinates"){
                if (posting[key].length === 2 && typeof(posting[key][0]) === "number" && typeof(posting[key][1]) === "number"){
                    res["latitude"] = posting[key][0]        
                    res["longitude"] = posting[key][1]            
                } else {
                    res["latitude"] = null
                    res["longitude"] = null           
                }
            } else if (key === "journey"){
                if (!posting[key]){
                    res[key] = null
                } else {
                    let journey = await Journey.findById(posting[key]).exec()
                    if (!journey){
                        res[key] = null
                    } else {
                        let resJourneyObject = {}
                        resJourneyObject["_id"] = journey._id
                        resJourneyObject["title"] = journey.title
                        res[key] = resJourneyObject
                    }
                }
            } else {
                res[key] = posting[key]
            }
        }
        return res
    }

    async _getReturnedJourneyField(journey){
        let res = {}
        for (let key of returnedJourneyField) {
            if (key === "journeyPostings"){
                let posting = await Posting.find({"journey": journey["_id"]}).exec()
                res["journeyPostings"] = []
                for (let eachPosting of posting){
                    let currPosting = await this._getReturnedPostingField(eachPosting)                        
                    res["journeyPostings"].push(currPosting)
                }
        
            } else {
                res[key] = journey[key]
            }
        }
        return res
    }

    async getJourney(journeyId){
        let journey = await Journey.findById(journeyId).exec()
        if (!journey){
            return null
        }

        let res = await this._getReturnedJourneyField(journey)

        logger.log(`Get journey [${journey.title}]`)
        return res
    }

    async updateJourney(user, journeyId, data){
        let journey = await Journey.findById(journeyId).exec()
        if (!journey){
            return "not found"
        }
        if (journey.author !== user){
            console.log(journey.author)
            console.log(user)

            return "unauthorized"
        }
        let updatedjourney = await Journey.findByIdAndUpdate(journeyId, data, {new: true}).exec()
        let res = await this._getReturnedJourneyField(updatedjourney)
        logger.log(`Update journey [${updatedjourney.title}]`)
        return res
    }

    async deleteJourney(user, journeyId){
        let journey = await Journey.findById(journeyId).exec()
        if (!journey){
            return "not found"
        }
        if (journey.author !== user){
            return "unauthorized"
        }
        let deletedJourney = await Journey.findByIdAndRemove(journeyId).exec()
        let res = await this._getReturnedJourneyField(deletedJourney)
        let posting = await Posting.find({"journey": journeyId, "author": deletedJourney.author}).exec()
        for (let eachPosting of posting){
            eachPosting.journey = null
            await Posting.findByIdAndUpdate(eachPosting._id, eachPosting).exec()
        }
        logger.log(`Delete journey [${deletedJourney.title}]`)
        return res

    }

}
const service = new JourneyService()

module.exports = service

