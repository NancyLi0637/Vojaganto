const logger = { log: console.log }
const postingService = require("../../services/posting")
const { ObjectId } = require('mongodb')
const {getAndValidateObjectId, getAndValidateDataBody} = require("../../util/helper")

class PostingController {



    // Leave for now
    async getAllPosting(req){

        let page = req.query.page
        let search = req.query.search
        if (!page){
            page = null
        } else if (!parseInt(page)){
            throw { status: 400, msg: `Unsatisfied: Invalid page type`}
        } else if (parseInt(page) <= 0){
            throw { status: 400, msg: `Unsatisfied: Invalid page type`}
        } else {
            page = parseInt(page)
        }
        if (!search){
            search = null
        }
        let postings = await postingService.getAllPosting(page, search)
        if (postings === "not found"){
            throw { status: 404, msg: `Not Found: Posting doesn't exist`}
        }
        return postings
    }


    async getOnePosting(req){
        const postingId = getAndValidateObjectId(req, "_id")
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



    async createOnePosting(req){
        const data = getAndValidateDataBody(req.body, ["title", "destination"], ["journey", "date", "body", "public", "images", "longitude", "latitude"], req.session.user)
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


    async changeOnePosting(req){
        const data = getAndValidateDataBody(req.body, ["title", "destination"], ["journey", "date", "body", "public", "images", "longitude", "latitude"], req.session.user)
        const postingId = getAndValidateObjectId(req, "_id")

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

    async deleteOnePosting(req){
        const postingId = getAndValidateObjectId(req, "_id")
        if (!postingId){
            throw { status: 400, msg: `Unsatisfied: Missing posting id`}
        }
        let posting = await postingService.deleteOnePosting(req.session.user, postingId)
        if (!posting){
            throw { status: 500, msg: `Failed: Posting can not be delted due to internal server error`}
        } else if (posting === "unauthorized"){
            throw { status: 403, msg: `Unauthorized: User does not have access to the required posting`}
        } else if (posting === "not found"){
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
