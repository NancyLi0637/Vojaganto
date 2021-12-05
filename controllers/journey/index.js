const logger = { log: console.log }
const journeyService = require("../../services/journey")
const { ObjectId } = require('mongodb')

class JourneyController {

    async _getJourneyData(journeyBody, requiredField, optionalField){
        let data = {}
        for(let eachRequiredField of requiredField){
            if (!(Object.keys(journeyBody).includes(eachRequiredField))){
                
                throw { msg: `Unsatisfied: Missing field [${eachRequiredField}]in request body`}
            
            } else {
                data[eachRequiredField] = journeyBody[eachRequiredField]
            }
        }
        for (let eachOptionalField of optionalField){
            if (!(Object.keys(journeyBody).includes(eachOptionalField))){
                data[eachOptionalField] = null
            } else {
                data[eachOptionalField] = journeyBody[eachOptionalField]
            }
        }
        return data

    }


    async getJourney(req){
        let journeyId = req.params._id
        if (!journeyId){
            throw { msg: `Unsatisfied: Missing field in request query`}
        }
        let journey = await journeyService.getJourney(journeyId)
        if (!journey){
            throw { msg: `Not Found: Journey doesn't exist`}
        }
        return journey

    }

    async updateJourney(req){
        const journeyBody = req.body
        const journeyId = req.params._id
        if (!journeyId){
            throw { msg: `Unsatisfied: Missing field in request query`}
        }
        const requiredField = ["title", "author"]
        const optionalField = ["color"]
        let data = await this._getJourneyData(journeyBody, requiredField, optionalField)
        if (req.session.user !== data["author"]){
            throw { msg: `Unauthorized: User can not update the journey`}
        }
        let journey = await journeyService.updateJourney(req.session.user, journeyId, data)
        if (!journey){
            throw { msg: `Failed: Journey can not be updated due to internal server error`}
        } else if (journey === "not found"){
            throw { msg: `Not Found: Journey can not be found`}
        }
        return journey


    }

    async deleteJourney(req){
        const journeyId = req.params._id
        if (!journeyId){
            throw { msg: `Unsatisfied: Missing journey id`}
        }
        let journey = await journeyService.deleteJourney(req.session.user, journeyId)
        if (!journey){
            throw { msg: `Failed: Journey can not be deleted due to internal server error`}
        } else if (journey === "unauthorized"){
            throw { msg: `Unauthorized: User does not have access to the required journey`}
        } else if (journey === "not found"){
            throw { msg: `Not Found: Journey can not be found`}
        }
        return journey
    }

}


const controller = new JourneyController

module.exports = controller