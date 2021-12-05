const logger = { log: console.log }
//const bcrypt = require("bcrypt");
const { User, Journey, Posting } = require("../../models")
const { ObjectId } = require("mongodb")
const returnedField = ["_id", "title", "destination", "coordinates", "author", "journey", "date", "body", "images", "public", "createdTime"]

// const journeyService = require('../journey')
const userService = require('../user')



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
                if (!res.journey) {
                    res.journey = {
                        _id: null,
                        title: "Unnamed journey"
                    }
                }
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
        const availableFields = ["title", "destination", "journey", "body"]

        // Search postings
        let postings = null
        if (!search) {
            postings = await Posting.find({ public: true })
        } else {
            let filter = []
            for (let key of availableFields) {
                let currFilter = {}
                currFilter[key] = new RegExp(".*" + search + ".*", "i")
                filter.push(currFilter)
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
            res.push(await this.getReturnedPostingField(posting, true))
        }
        // res.push(currPosting)
        logger.log("Get all postings")
        return res
    }




    async getOnePosting(user, postingId) {
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "posting not found"
        }

        if (posting.public === false && posting.author !== user) {
            return "unauthorized"
        }

        let res = this.getReturnedPostingField(posting)
        logger.log(`Get Posting [${posting.title}]`)
        return res
    }

    async createOnePosting(user, data) {
        if (data.journey !== "") {
            // FIXME: just take the id
            let journey = await Journey.find({ "title": data["journey"], "author": user }).exec()
            if (!journey) {
                return "journey not found"
            }
        }


        let newPosting = new Posting(data)
        console.log(newPosting)
        let createdPosting = await newPosting.save()
        // QUESTION: What is convertedID doing here?
        let res = await this.getReturnedPostingField(createdPosting)
        logger.log(`Create Posting [${createdPosting.title}]`)
        return res

    }


    async changeOnePosting(user, postingId, data) {
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "posting not found"
        }

        if (posting.author !== user) {
            return "unauthorized"
        }

        if (data.journey !== "") {
            let journey = await Journey.find({ "title": data["journey"], "author": user }).exec()
            if (!journey) {
                return "journey not found"
            }
        }


        let updatedPosting = await Posting.findByIdAndUpdate(postingId, data, { new: true }).exec()
        let res = await this.getReturnedPostingField(updatedPosting)
        logger.log(`Modify Posting [${updatedPosting.title}]`)
        return res
    }


    async deleteOnePosting(user, postingId) {
        let posting = await Posting.findById(postingId).exec()
        if (!posting) {
            return "not found"
        }
        if (posting.author !== user) {
            return "unauthorized"
        }
        let deletedPosting = await Posting.findByIdAndRemove(postingId).exec()

        let res = await this.getReturnedPostingField(deletedPosting)
        logger.log(`Delete Posting [${deletedPosting.title}]`)
        if (deletedPosting.journey !== null) {
            let allPosting = await Posting.find().exec()
            let removeJourney = true
            for (let eachPosting of allPosting) {
                if (eachPosting.journey === deletedPosting.journey) {
                    removeJourney = false
                    break
                }
            }
            if (removeJourney) {
                let journey = await Journey.findByIdAndRemove(deletedPosting.journey).exec()
                logger.log(`Delete Journey [${journey.title}]`)
            }
        }

        return res
    }




}

const service = new PostingService()

module.exports = service
