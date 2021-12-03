const logger = { log: console.log }
const bcrypt = require("bcrypt");
const { User } = require("../../models/User")
const { Journey } = require("../../models/Journey")
const { Posting } = require("../../models/Posting")
const returnedField = ["title", "author", "color"]
class JourneyService {


    async getJourney(journeyId){
        let journey = await Journey.findById(journeyId).exec()
        let posting = await Posting.find({"journey": journeyId}).exec()
        let res = {}
        res["_id"] = journey["_id"]
        res["title"] = journey["title"]
        res["author"] = journey["author"]
        res["journeyPostings"] = []
        for (let eachPosting of posting){
            let currPosting = {}
            currPosting["author"]
            currPosting["_id"]
            currPosting["date"]
            currPosting["title"]
            currPosting["body"]
            currPosting["image"]
            
            res["journeyPostings"].push(currPosting)
        }

        logger.log(`Get journey [${journey.title}]`)
        return res
    }

    async updateJourney(user, journeyId, data){
        let journey = await Journey.findById(journeyId).exec()
        if (!journey){
            throw "not found"
        }
        if (journey._id !== user._id){
            throw "unauthorized"
        }
        let journey = await Journey.findByIdAndUpdate(journeyId, data, {new: true}).exec()
        let res = {}
        for (let eachRequiredField of requiredField){
            res[eachRequiredField] = journey[eachRequiredField]
        }
        logger.log(`Update journey [${journey.title}]`)
        return res
    }

    async deleteJourney(user, journeyId){
        let journey = await Journey.findById(journeyId).exec()
        if (!journey){
            throw "not found"
        }
        if (journey._id !== user._id){
            throw "unauthorized"
        }
        let journey = await Journey.findByIdAndRemove(journeyId).exec()
        let res = {}
        for (let eachRequiredField of requiredField){
            res[eachRequiredField] = journey[eachRequiredField]
        }
        let posting = await Posting.find({"journey": journeyId, "author": journey.author}).exec()
        for (let eachPosting of posting){
            eachPosting.journey = null
            await Posting.findByIdAndUpdate(eachPosting._id, eachPosting).exec()
        }
        logger.log(`Delte journey [${journey.title}]`)
        return res

    }

}

module.exports = () => {
    const journeyService = new JourneyService()
    return journeyService
}