const logger = { log: console.log }
//const bcrypt = require("bcrypt");
const { Posting } = require("../../models/Posting")
const { Journey } = require("../../models/Journey")
const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey","date", "body", "images", "public", "createdTime"]



class PostingService {

    async _getReturnedPostingField(posting){
        const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey","date", "body", "images", "public", "createdTime"]
        let res = {}
        for (let key of returnedField) {
            if (key === "coordinates"){
                if (posting[key].length === 2 && typeof(posting[key][0]) === "number" && typeof(posting[key][1]) === "number"){
                    res["latitude"] = posting[key][0]        
                    res["longitude"] = posting[key][1]            
                } else {
                    res["latitude"] = null
                    res["longitude"] = null           
                }
            } else if (key === "journey"){
                if (!posting[key]){
                    res[key] = null
                } else {
                    let journey = await Journey.findById(posting[key]).exec()
                    if (!journey){
                        res[key] = null
                    } else {
                        let resJourneyObject = {}
                        resJourneyObject["_id"] = journey._id
                        resJourneyObject["title"] = journey.title
                        res[key] = resJourneyObject
                    }
                }
            } else {
                res[key] = posting[key]
            }
        }
        return res
    }

    async getAllPosting(paging=null, search=null, sort={}){

        const pagingItemNum = 10
        const availableFields = ["title", "destination", "coordinates", "journey", "body"]
        /*
        if (mongoose.connection.readyState != 1) {
            logger.log('Issue with mongoose connection')
            return null;
        } 
        */ 
        let postings = null
        if (!search){
            postings = await Posting.find()
        } else {
            let filter = []
            for (let key of availableFields) {
                let currFilter = {}
                currFilter[key] = new RegExp(".*" + search + ".*", "i")
                filter.push(currFilter)
            }

            postings = await Posting.find({ $or: filter }).sort(sort).exec()
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
        let currPosting = {}
        currPosting["postings"] = []
        for (let posting of resPosting){
            currPosting["postings"].push(await this._getReturnedPostingField(posting))
        }
        res.push(currPosting)
        logger.log("Get all postings")
        return res

    }




    async getOnePosting(user, postingId){

        let posting  = await Posting.findById(postingId).exec()
        if (!posting){
            return null
        }
        if (posting.public === false && posting.author !== user){
            return "unauthorized"
        }
        let res = this._getReturnedPostingField(posting)
        logger.log(`Get Posting [${posting.title}]`)
        return res
    }

    async createOnePosting(user, data){
        if (user !== data.author){
            return "unauthorized"
        }
        if (data.journey !== null){
            let journey = await Journey.findById(data.journey).exec()
            if (!journey){
                return "journey not found"
            }
        }

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
            return "not found"
        }

        if (posting.author !== user){
            return "unauthorized"
        }

        let updatedPosting = await Posting.findByIdAndUpdate(postingId, data, {new: true}).exec()
        let res = await this._getReturnedPostingField(updatedPosting)
        logger.log(`Modify Posting [${updatedPosting.title}]`)
        return res
    }

    async deleteOnePosting(user, postingId){
        let posting = await Posting.findById(postingId).exec()
        if (!posting){
            return "not found"
        }
        if (posting.author !== user){
            return "unauthorized"
        }
        let deletedPosting = await Posting.findByIdAndRemove(postingId).exec()

        let res =await this._getReturnedPostingField(deletedPosting)
        logger.log(`Delete Posting [${deletedPosting.title}]`)
        if (deletedPosting.journey !== null){
        let allPosting = await Posting.find().exec()
        let removeJourney = true
        for (let eachPosting of allPosting){
            if (eachPosting.journey === deletedPosting.journey){
                removeJourney = false
                break
            }
        }
        if (removeJourney){
            let journey = await Journey.findByIdAndRemove(deletedPosting.journey).exec()
            logger.log(`Delete Journey [${journey.title}]`)
        }
        }

        //let postingAndJourney = await Posting.aggregate({from: ""})

        return res
    }




}

const service = new PostingService()

module.exports = service
