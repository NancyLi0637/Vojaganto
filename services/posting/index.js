const logger = { log: console.log }
//const bcrypt = require("bcrypt");
const { Posting } = require("../../models/Posting")
const { mongoose } = require('./db/mongoose')
const returnedField = ["title", "destination", "coordinates", "author", "journey","date", "body", "images", "public", "createdTime"]

class PostingService {

    async _getReturnedPostingField(posting){
        let res = {}
        for (let key of returnedField) {
            res[key] = posting[key]
        }
        return res
    }

    async getAllPosting(page=null, search=null, sort={}){

        const pagingItemNum = 10
        const availiableField = ["title", "destination", "coordinates", "author", "journey", "body"]
        if (mongoose.connection.readyState != 1) {
            logger.log('Issue with mongoose connection')
            return null;
        }  

        if (!search){
            let postings = await Posting.find()
        } else {
            let filter = []
            for (let key of availiableField) {
                let currFilter = {}
                currFilter[key] = new RegExp(".*" + search + ".*", "i")
                filter.push(currFilter)
            }

            let postings = await Posting.find({ $or: filter }).sort(sort).exec()
        }
        
        if (!postings){
            return "not found"
        }

        let resPosting = postings
        if (paging !== null){
            if (postings.length <= (paging-1)*pagingItemNum){
                return "not found"
            } else {
                resPosting = postings.slice((paging-1)*pagingItemNum, paging*pagingItemNum)
            }
        }
        let res = []
        for (posting of resPosting){
            res.append(await this._getReturnedPostingField(posting))
        }
        logger.log("Get all postings")
        return res

    }




    async getOnePosting(user, postingId){

        let posting  = await Posting.findById(postingId).exec()
        if (posting.public === false && posting.author !== user._id){
            throw "unauthorized"
        }
        if (!posting){
            throw "not found"
        }
        let res = this._getReturnedPostingField(posting)
        logger.log(`Get Posting [${posting.title}]`)
        return res
    }

    async createOnePosting(data){
        let newPosting = new Posting(data)
        let createdPosting = await newPosting.save()
        // QUESTION: What is convertedID doing here?
        let res = await this._getReturnedPostingField(createdPosting)
        logger.log(`Create Posting [${createdPosting.title}]`)
        return res
 
    }


    async changeOnePosting(user, postingId, data){
        let posting = await Posting.findById(postingId).exec()
        if (!posting){
            throw "not found"
        }

        if (posting.author !== user._id){
            throw "unauthorized"
        }

        let posting = await Posting.findByIdAndUpdate(postingId, data, {new: true}).exec()
        let res = await this._getReturnedPostingField(posting)
        logger.log(`Modify Posting [${posting.title}]`)
        return res
    }

    async deleteOnePosting(user, postingId){
        let posting = await Posting.findById(postingId).exec()
        if (!posting){
            throw "not found"
        }
        if (posting.author !== user._id){
            throw "unauthorized"
        }
        let posting = await Posting.findByIdAndRemove(postingId).exec()

        let res =await this._getReturnedPostingField(posting)
        logger.log(`Delete Posting [${posting.title}]`)
        
        let allPosting = await Posting.find().exec()
        let removeJourney = true
        for (eachPosting of allPosting){
            if (eachPosting.journey === posting.journey){
                removeJourney = false
                break
            }
        }
        if (removeJourney){
            await Journey.findByIdAndRemove(posting.journey).exec()
            logger.log(`Delete Journey [${posting.journey.title}]`)
        }

        //let postingAndJourney = await Posting.aggregate({from: ""})

        return res
    }




}

module.exports = () => {
    const postingService = new PostingService()
    return postingService
}