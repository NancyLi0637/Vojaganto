const logger = { log: console.log }
const createJourneyService = require("../../services/journey")

class JourneyController {
    constructor() {
        this.journeyService = createJourneyService()
    }

    async _getJourneyData(journeyBody, requiredField, optionalField){
        let data = {}
        for(let eachRequiredField of requiredField){
            if (!(Object.keys(journeyBody).includes(eachRequiredField))){
                
                throw `Unsatisfied: Missing field [${eachRequiredField}]in request body`
            
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
            throw "Unsatisfied: Missing field in request query"
        }
        let journey = await this.journeyService.getJourney(journeyId)
        if (!journey){
            throw "Not Found: Journey doesn't exist"
        }
        return journey

    }

    async updateJourney(req){
        const journeyBody = req.body
        const journeyId = req.params._id
        if (!journeyId){
            throw "Unsatisfied: Missing field in request query"
        }
        const requiredField = ["title", "author"]
        const optionalField = ["color"]
        let data = await this._getJourneyData(journeyBody, requiredField, optionalField)
        if (req.session.user._id !== data["author"]){
            throw "Unauthorized: User can not update the journey"
        }
        let journey = await this.journeyService.updateJourney(req.session.user, journeyId, data)
        if (!journey){
            throw "Failed: Journey can not be updated due to internal server error"
        } else if (journey === "not found"){
            throw "Not Found: Journey can not be found"
        }
        return journey


    }

    async deleteJourney(req){
        const journeyId = req.params._id
        if (!journeyId){
            throw "Unsatisfied: Missing journey id"
        }
        let journey = await this.journeyService.deleteJourney(req.session.user, journeyId)
        if (!journey){
            throw "Failed: Journey can not be deleted due to internal server error"
        } else if (journey === "unauthorized"){
            throw "Unauthorized: User does not have access to the required journey"
        } else {
            throw "Not Found: Journey can not be found"
        }
        return journey
    }

}

module.exports = () => {
    const journeyController = new JourneyController()
    return journeyController
}