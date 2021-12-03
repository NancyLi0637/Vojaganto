const logger = { log: console.log }
const createPostingService = require("../../services/posting")

class PostingController {
    constructor() {
        this.postingService = createPostingService()
    }

    async getAllPosting(req){

        const page = req.query.page
        const search = req.query.search
        if (!page){
            page = null
        } else if (!parseInt(page)){
            throw "Unsatisfied: Invalid page type"
        } else if (parseInt(page) <= 0){
            throw "Unsatisfied: Invalid page type"
        } else {
            page = parseInt(page)
        }
        if (!search){
            search = null
        }
        let postings = await this.postingService.getAllPosting(page, search)
        return posting
    }


    async getOnePosting(req){
        const postingId = req.parmas._id
        if (!postingId){
            throw "Unsatisfied: Missing field in request query"
        }
        let posting = await this.postingService.getOnePosting(req.session.user, postingId)
        if (!posting){
            throw "Not Found: Posting doesn't exist"
        } else if (posting === "unauthorized"){
            throw "Unauthorized: User does not have access to the required posting"
        }
        return posting
    }

    async _getPostingData(postingBody, requiredField, optionalField){
        let data = {}
        for(let eachRequiredField of requiredField){
            if (!(Object.keys(postingBody).includes(eachRequiredField))){
                
                throw `Unsatisfied: Missing field [${eachRequiredField}]in request body`
            
            } else {
                data[eachRequiredField] = postingBody[eachRequiredField]
            }
        }
        for (let eachOptionalField of optionalField){
            if (!(Object.keys(postingBody).includes(eachOptionalField))){
                if (eachOptionalField === "body"){
                    data["body"] = ""
                } else if (eachOptionalField === "public"){
                    date["public"] = true
                } else {
                    data[eachOptionalField] = null
                }
            } else {
                data[eachOptionalField] = postingBody[eachOptionalField]
            }
        }
        return data


    }
    async createOnePosting(req){
        const postingBody = req.body
        const requiredField = ["title", "destination", "author"]
        const optionalField = ["journey", "date", "body", "public", "images"]
        let data = await _getPostingData(postingBody, requiredField, optionalField)
        let posting = await this.postingService.createOnePosting(data)
        if (!posting){
            throw "Failed: Posting can not be created due to internal server error"
        } else if (posting === "unauthorized"){
            throw "Unauthorized: User does not have access to the required posting"
        }
        return posting


    }


    async changeOnePosting(req){
        const postingBody = req.body
        const postingId = req.parmas._id
        if (!postingId){
            throw "Unsatisfied: Missing posting id"
        }
        const requiredField = ["title", "destination", "author"]
        const optionalField = ["journey", "date", "body", "public", "images"]
        let data = await _getPostingData(postingBody, requiredField, optionalField)

        let posting = await this.postingService.changeOnePosting(req.session.user, postingId, data)
        if (!posting){
            throw "Failed: Posting can not be updated due to internal server error"
        } else if (posting === "unauthorized"){
            throw "Unauthorized: User does not have access to the required posting"
        } else if (posting === "not found"){
            throw "Not Found: Posting can not be found"
        }

        return posting
    }

    async deleteOnePosting(req){
        const postingId = req.params._id
        if (!postingId){
            throw "Unsatisfied: Missing posting id"
        }
        let posting = await this.postingService.deletedOnePosting(req.session.user, postingId)
        if (!posting){
            throw "Failed: Posting can not be delted due to internal server error"
        } else if (posting === "unauthorized"){
            throw "Unauthorized: User does not have access to the required posting"
        } else if (posting === "not found"){
            throw "Not Found: Posting can not be found"
        }
        return posting
    }



}

module.exports = () => {
    const postingController = new PostingController()
    return postingController
}