const logger = { log: console.log }
const postingService = require("../../services/posting")
const { ObjectId } = require('mongodb')
const {getAndValidateObjectId, getAndValidateDataBody} = require("../../util/validateAndGet")

class PostingController {



     /** Handle the API request input, and get all the public postings with their meta information according to the searching and paging (searching will search for "title", "destination", "author username", "author name", "journey title", "body")
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the rqeuested all posting inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async getAllPosting(req){

        let page = req.query.page
        let search = req.query.search
        if (!page){
            page = null
        } else if (!parseInt(page) || parseInt(page) <= 0){
            throw { status: 400, msg: `Unsatisfied: Invalid page type`}
        } else {
            page = parseInt(page)
        }
        if (!search){
            search = null
        }
        let postings = await postingService.getAllPosting(page, search)
        return postings
    }

     /** Handle the API request input, and get one posting with its information according to the input posting id, and accroding to the priviledge level of the user
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the rqeuested posting inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async getOnePosting(req){
        const postingId = getAndValidateObjectId(req.params, "_id")
        let posting = await postingService.getOnePosting(req.session.user, postingId)
        if (!posting){
            throw { status: 500, msg: `Failed: Posting can be got due to internal server error`}
        }else if(posting === "posting not found"){
            throw { status: 404, msg: `Not Found: Posting doesn't exist`}
        } else if (posting === "unauthorized"){
            throw { status: 403, msg: `Forbidden: User does not have access to the required posting`}
        }
        return posting
    }


     /** Handle the API request input, and create one posting for the current user according to the input posting infomation
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the created posting inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async createOnePosting(req){
        // Set the createdTime to the current time during the posting creation, and set the journey to default journey
        req.body["createdTime"] = new Date()
        if (req.body.journey === "" || !req.body.journey){
            req.body.journey = req.user.defaultJourney
        } else {
            getAndValidateObjectId(req.body, "journey")
        }
        const data = getAndValidateDataBody(req.body, ["title", "createdTime"], ["journey", "date", "body", "public", "images", "longitude", "latitude", "destination"], req.session.user)
        let posting = await postingService.createOnePosting(req.session.user, data)

        if (!posting){
            throw { status: 500, msg: `Failed: Posting can not be created due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { status: 403, msg: `Forbidden: User does not have access to the required posting`}
        } else if (posting === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey not found`}
        }
        return posting
    }


    /** Handle the API request input, and update one posting according to the input posting infomation and the priviledge level of the user
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the updated posting inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async changeOnePosting(req){
        // Turn the "" journey input into the default journey
        if (req.body.journey === "" || !req.body.journey){
            req.body.journey = req.user.defaultJourney
        } else {
            getAndValidateObjectId(req.body, "journey")
        }
        const data = getAndValidateDataBody(req.body, [], ["title", "journey", "date", "body", "public", "images", "longitude", "latitude", "createdTime", "destination"], req.session.user)
        const postingId = getAndValidateObjectId(req.params, "_id")

        let posting = await postingService.changeOnePosting(req.session.user, postingId, data)

        if (!posting){
            throw { status: 500, msg: `Failed: Posting can not be created due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { status: 403, msg: `Forbidden: User does not have access to the required posting`}
        } else if (posting === "journey not found"){
            throw { status: 404, msg: `Not Found: Journey not found`}
        } else if (posting === "posting not found"){
            throw {status: 404, msg: `Posting not found`}
        }


        return posting
    }

     /** Handle the API request input, and delete one posting according to the input posting id
     * 
     * @param {*} req The request object from API call
     * @returns If success, return the deleted posting inforamtion
     *          If failed, return a error message object with status and error message in it
     */
    async deleteOnePosting(req){
        const postingId = getAndValidateObjectId(req.params, "_id")

        let posting = await postingService.deleteOnePosting(req.user, postingId)
        if (!posting){
            throw { status: 500, msg: `Failed: Posting can not be delted due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { status: 403, msg: `Unauthorized: User does not have access to the required posting`}
        } else if (posting === "posting not found"){
            throw { status: 404, msg: `Not Found: Posting can not be found`}
        }
        return posting
    }

    async uploadImage(req){
        if(!req.file){
            throw { msg: `Unsatisfied: Missing field in request body`, status: 400 }
        }
        const uploadedImg = postingService.uploadImage(req.file)
        return uploadedImg
    }

    async deleteImage(req){
        let body = req.body
        if(!body.image){
            throw { msg: `Unsatisfied: Missing field in request body`, status: 400 }
        }
        const deletedImg = postingService.deleteImage(body.image)
        return deletedImg
    }

}

const controller = new PostingController
module.exports = controller
