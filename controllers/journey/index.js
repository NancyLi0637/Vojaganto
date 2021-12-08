const logger = { log: console.log }
const journeyService = require("../../services/journey")
const { ObjectId } = require('mongodb')
const {getAndValidateObjectId, getAndValidateDataBody} = require("../../util/validateAndGet")

class JourneyController {


    /** Handle the API request input, and get one journey according to journey id given
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the rqeuested journey inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async getJourney(req){
        let journeyId = getAndValidateObjectId(req.params, "_id")
        let journey = await journeyService.getJourney(req.session.user, journeyId)
        if (journey === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey doesn't exist`}
        }
        return journey

    }

    
   
    /** Handle the API request input, and update one journey (Only allows when the user is the journey author) 
    * 
    * @param {*} req The request object from API call
    * @returns If success, return the updated journey object information 
    *          If failed, return a error message object with status and error message in it
    */
    async updateJourney(req){
        const data = getAndValidateDataBody(req.body, [], ["title", "color"], req.session.user)

        const journeyId = getAndValidateObjectId(req.params, "_id")
        let journey = await journeyService.updateJourney(req.session.user, journeyId, data)
        if (!journey){
            throw { status: 500, msg: `Failed: Journey can not be updated due to internal server error`}
        } else if (journey === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey can not be found`}
        } else if (journey === "unauthorized"){
            throw { status: 403, msg: `Forbidden: User does not have access to the required posting`}
        }
        return journey


    }

    /** Handle the API request input, and delete a given journey according to id (Only allow when the user is the author)
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the deleted journey object information 
     *          If failed, return a error message object with status and error message in it
     */
    async deleteJourney(req){
        const journeyId = getAndValidateObjectId(req.params, "_id")
        let journey = await journeyService.deleteJourney(req.session.user, journeyId)
        if (!journey){
            throw { status: 500, msg: `Failed: Journey can not be deleted due to internal server error`}
        } else if (journey === "unauthorized"){
            throw { status: 403, msg: `Unauthorized: User does not have access to the required journey`}
        } else if (journey === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey can not be found`}
        } else if (journey === "default journey"){
            throw { status: 400, msg: `Unsatisfied: Journey is the default journey and can not be deleted`}
        }
        return journey
    }

}


const controller = new JourneyController

module.exports = controller