const logger = { log: console.log }
//const bcrypt = require("bcrypt");
const { User, Journey, Posting } = require("../../models")
const { ObjectId } = require("mongodb")
const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey", "date", "body", "images", "public", "createdTime"]

// const journeyService = require('../journey')
const userService = require('../user')

const imageProcess = require("../../util/imageProcess")
const fs = require("fs")


class PostingService {
    /**Helper function that turns the postings data to its returned form
     * 
     * @param {*} posting 
     * @param {*} meta 
     * @returns 
     */
    async getReturnedPostingField(posting, meta = false) {
        const res = {
            _id: posting._id.toString(),
            title: posting.title,
            destination: posting.destination,
            body: posting.body,
            date: posting.date,
            images: posting.images,
            createdTime: posting.createdTime,
            latitude: posting.latitude,
            longitude: posting.longitude,
            public: posting.public,
            journey: posting.journey,
            author: posting.author
        }

        if (!meta) {
            if (ObjectId.isValid(posting.journey)) {
                const journey = await Journey.findById(posting.journey).exec()
                res.journey = journey
            }

            //TODO: There is a circular dependency in the original version. Changed to this for now, look for a neat solution in the future
            //res.author = await userService.getUser(posting.author)
            let user = await User.findById(posting.author).exec()
            user.password = undefined
            res.author = user
        }

        return res
    }



    async getAllPosting(paging = null, search = null, sort = {}) {

        const pagingItemNum = 10
        const availableFields = ["title", "destination", "author", "journey", "body"]

        // Search postings
        let postings = null
        if (!search) {
            postings = await Posting.find({ public: true })
        } else {
            let filter = []
            for (let key of availableFields) {
                let currFilter = {}
                if (key === "journey"){
                // Handle the searching for journey
                    let allFoundJourney = await Journey.find({title: new RegExp(".*" + search + ".*", "i")}).exec()
                    for (let eachFoundJourney of allFoundJourney){
                        filter.push({"journey": eachFoundJourney._id})
                    }
                } else if (key === "author"){
                // Handle the searching for author
                    let searching = new RegExp(".*" + search + ".*", "i")
                    let allFoundAuthor = await User.find({$or:[{username: searching}, {name:searching}]}).exec()
                    for (let eachFoundAuthor of allFoundAuthor){
                        filter.push({"author": eachFoundAuthor._id})
                    }
                } else {
                //Handle the searching for other fields
                    currFilter[key] = new RegExp(".*" + search + ".*", "i")
                    filter.push(currFilter)
                }
            }

            postings = await Posting.find({ public: true, $or: filter }).sort(sort).exec()
        }

        // console.log(postings)
        // let resPosting = postings.filter((posting) => {
        //     return posting.public === true

        // })
        // let resPosting = postings
        // console.log(resPosting)
        // Pagination
        if (paging !== null) {
            if (postings.length <= (paging - 1) * pagingItemNum) {
                return "not found"
            } else {
                postings = postings.slice((paging - 1) * pagingItemNum, paging * pagingItemNum)
            }
        }


        let res = []
        // let currPosting = {}
        // currPosting["postings"] = []
        // console.log(postings)
        for (let posting of postings) {
            res.push(await this.getReturnedPostingField(posting))
        }
        // res.push(currPosting)
        logger.log("Get all postings")
        return res
    }




    async getOnePosting(userId, postingId) {
        // Get the posting
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "posting not found"
        }
        // Checking privielage
        if (posting.public === false && posting.author !== userId.toString()) {
            return "unauthorized"
        }

        // Returning in appropriate data structure
        let res = this.getReturnedPostingField(posting)
        logger.log(`Get Posting [${posting.title}]`)
        return res
    }

    async createOnePosting(userId, data) {

        // Get the journey for priviledge check
        

        //let journey = await Journey.find({ "title": data["journey"], "author": userId }).exec()
        console.log("Create Posting receive: ", data)
        let journey = await Journey.findById(data["journey"]).exec()
        if (!journey) {
            return "journey not found"
        }
        // Create the posting
        let newPosting = new Posting(data)
        let createdPosting = await newPosting.save()
        let res = await this.getReturnedPostingField(createdPosting)
        logger.log(`Create Posting [${createdPosting.title}]`)
        return res

    }


    async changeOnePosting(userId, postingId, data) {
        // Get the posting for priviledge check
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "posting not found"
        }

        if (posting.author !== userId.toString()) {
            return "unauthorized"
        }

        // Check if the input journey exist
        //let journey = await Journey.find({ "title": data["journey"], "author": userId }).exec()
        let journey = await Journey.findById(data["journey"]).exec()
        if (!journey) {
            return "journey not found"
        }

        // Update the posting
        let updatedPosting = await Posting.findByIdAndUpdate(postingId, data, { new: true }).exec()
        let res = await this.getReturnedPostingField(updatedPosting)
        logger.log(`Modify Posting [${updatedPosting.title}]`)
        return res
    }


    async deleteOnePosting(user, postingId) {
        // Find the posting
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "posting not found"
        }
        // Check for priviledge

        if (posting.author !== user._id.toString()){
            if (user.role !== "admin" || posting.public === false){
                return "unauthorized"
            }
        }
        // Delte the posting
        let deletedPosting = await Posting.findByIdAndRemove(postingId).exec()


        await imageProcess.deleteImage(deletedPosting.images)
        // Get the return data structure
        let res = await this.getReturnedPostingField(deletedPosting)
        logger.log(`Delete Posting [${deletedPosting.title}]`)
        // Delete its journey if that posting is the last posting in that journey (except if the journey is the default journey)
        let author = await User.findById(deletedPosting.author).exec()

        if (deletedPosting.journey !== author.defaultJourney) {
            let allPosting = await Posting.find({"journey": deletedPosting.journey, "author": deletedPosting.author}).exec()
            if (allPosting.length === 0){
                let journey = await Journey.findByIdAndRemove(deletedPosting.journey).exec()
                logger.log(`Delete Journey [${journey.title}]`)
            }

            
        }

        return res
    }

    async uploadImage(img){
        const uploadedImgs = await imageProcess.toObject([img.path])
        await fs.promises.rm(img.path)
        return uploadedImgs[0]
    }

    async deleteImage(imgObject){
        const deletedImgs = await imageProcess.deleteImage([imgObject])
        return deletedImgs[0]
    }


}

const service = new PostingService()

module.exports = service
