const logger = { log: console.log }
const journeyService = require("../../services/journey")
const { ObjectId } = require('mongodb')
const {getAndValidateObjectId, getAndValidateDataBody} = require("../../util/helper")

class JourneyController {



    async getJourney(req){
        let journeyId = getAndValidateObjectId(req, "_id")
        let journey = await journeyService.getJourney(journeyId)
        if (journey === "journey not found"){
            throw { statusCode: 404, msg: `Not Found: Journey doesn't exist`}
        }
        return journey

    }

    async updateJourney(req){
        const data = getAndValidateDataBody(req.body, ["title"], ["color"], req.session.user)

        const journeyId = getAndValidateObjectId(req, "_id")
        let journey = await journeyService.updateJourney(req.session.user, journeyId, data)
        if (!journey){
            throw { statusCode: 500, msg: `Failed: Journey can not be updated due to internal server error`}
        } else if (journey === "not found"){
            throw { statusCode: 404, msg: `Not Found: Journey can not be found`}
        } else if (journey === "unauthorized"){
            throw { statusCode: 403, msg: `Forbidden: User does not have access to the required posting`}
        }
        return journey


    }

    async deleteJourney(req){
        const journeyId = getAndValidateObjectId(req, "_id")
        let journey = await journeyService.deleteJourney(req.session.user, journeyId)
        if (!journey){
            throw { statusCode: 500, msg: `Failed: Journey can not be deleted due to internal server error`}
        } else if (journey === "unauthorized"){
            throw { statusCode: 403, msg: `Unauthorized: User does not have access to the required journey`}
        } else if (journey === "not found"){
            throw { statusCode: 404, msg: `Not Found: Journey can not be found`}
        }
        return journey
    }

}


const controller = new JourneyController

module.exports = controller