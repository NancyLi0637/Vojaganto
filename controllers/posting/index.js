const logger = { log: console.log }
const postingService = require("../../services/posting")
const { ObjectId } = require('mongodb')

class PostingController {

    async getAllPosting(req){

        let page = req.query.page
        let search = req.query.search
        if (!page){
            page = null
        } else if (!parseInt(page)){
            throw { msg: `Unsatisfied: Invalid page type`}
        } else if (parseInt(page) <= 0){
            throw { msg: `Unsatisfied: Invalid page type`}
        } else {
            page = parseInt(page)
        }
        if (!search){
            search = null
        }
        let postings = await postingService.getAllPosting(page, search)
        if (postings === "not found"){
            throw { msg: `Not Found: Posting doesn't exist`}
        }
        return postings
    }


    async getOnePosting(req){
        const postingId = req.params._id
        if (!postingId){
            throw { statusCode: 400, msg: `Unsatisfied: Missing field in request query`}
        } else if (!ObjectId.isValid(postingId)) {
            throw { statusCode: 400, msg: "Bad id" }
        }

        let posting = await postingService.getOnePosting(req.session.user, postingId)
        if (!posting){
            throw { statusCode: 404, msg: `Not Found: Posting doesn't exist`}
        } else if (posting === "unauthorized"){
            throw { statusCode: 403, msg: `Forbidden: User does not have access to the required posting`}
        }
        return posting
    }

    _validatePostingData(postingBody, requiredField, optionalField){
        let data = {}   // The valid posting data
        // Check every required field is satisfied
        for(let field of requiredField){
            if (!(field in postingBody)){
                throw { statusCode: 400, msg: `Unsatisfied: Missing field [${field}]in request body`}
            } else {
                data[field] = postingBody[field]
            }
        }
        // Fill every optional fields
        for (let field of optionalField){
            // if (!(Object.keys(postingBody).includes(eachOptionalField))){
            //     if (eachOptionalField === "body"){
            //         data["body"] = ""
            //     } else if (eachOptionalField === "public"){
            //         data["public"] = false
            //     } else {
            //         data[eachOptionalField] = null
            //     }
            // } else {
            //     data[eachOptionalField] = postingBody[eachOptionalField]
            // }
            if (field in postingBody){
                data[field] = postingBody[field]
            }
        }

        return data
    }

    async createOnePosting(req){
        const postingBody = req.body
        const requiredField = ["title", "destination"]
        const optionalField = ["journey", "date", "body", "public", "images", "longitude", "latitude"]
        let data = this._validatePostingData(postingBody, requiredField, optionalField)

        const author = req.session.user
        data.author = author
        console.log(data)
        let posting = await postingService.createOnePosting(author, data)

        if (!posting){
            throw { msg: `Failed: Posting can not be created due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { msg: `Unauthorized: User does not have access to the required posting`}
        } else if (posting === "journey not found"){
            throw { msg: `Not Found: Journey not found`}
        }
        return posting
    }


    async changeOnePosting(req){
        const postingBody = req.body
        const postingId = req.params._id
        if (!postingId){
            throw { msg: `Unsatisfied: Missing posting id`}
        }
        const requiredField = ["title", "destination", "author"]
        const optionalField = ["journey", "date", "body", "public", "images"]
        let data = await this._validatePostingData(postingBody, requiredField, optionalField)

        let posting = await postingService.changeOnePosting(req.session.user, postingId, data)
        if (!posting){
            throw { msg: `Failed: Posting can not be updated due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { msg: `Unauthorized: User does not have access to the required posting`}
        } else if (posting === "not found"){
            throw { msg: `Not Found: Posting can not be found`}
        }

        return posting
    }

    async deleteOnePosting(req){
        const postingId = req.params._id
        if (!postingId){
            throw { msg: `Unsatisfied: Missing posting id`}
        }
        let posting = await postingService.deleteOnePosting(req.session.user, postingId)
        if (!posting){
            throw { msg: `Failed: Posting can not be delted due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { msg: `Unauthorized: User does not have access to the required posting`}
        } else if (posting === "not found"){
            throw { msg: `Not Found: Posting can not be found`}
        }
        return posting
    }



}

const controller = new PostingController
module.exports = controller
