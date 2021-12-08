const { ObjectId } = require('mongodb')
/**The helper function that validates if an id is a validate object id, and return if it is valid
 * 
 * @param {*} body The body to get the input id from
 * @param {*} idName The name of the id that needs to get validated
 * @returns If the id is valid, return that id
 *          If it is not in the body, return error object { status: 400, msg: `Unsatisfied: Missing field in request`}
 *          If it is not valid, return error object { status: 400, msg: "Bad id" }
 */
const getAndValidateObjectId = (body, idName) => {

    const id = body[idName]
    if (!id){
        throw { status: 400, msg: `Unsatisfied: Missing field in request`}
    } else if (!ObjectId.isValid(id)) {
        throw { status: 400, msg: "Bad id" }
    }
    return id
}

/**The helper function that validates if a data body is a valid data body and return the filtered data body if it is valid
 * 
 * @param {*} body The body to get the input data from
 * @param {*} requiredField An array containing all the required fields of the body
 * @param {*} optionalField An array contianing all the optional fields of the body
 * @param {*} author If an author field should be in the body, let this be that author id and it will be put into the body, and if not, let it be null by default (Optional)
 * @returns The filtered data body if the body is valid
 *          If the required body is missing, return error object { status: 400, msg: `Unsatisfied: Missing field [${field}] in request body`}
 */
const getAndValidateDataBody = (body, requiredField, optionalField, author=null) => {

    let data = {}   // The valid posting data
    // Check every required field is satisfied
    for(let field of requiredField){
        if (!(field in body) || !body[field]){
            throw { status: 400, msg: `Unsatisfied: Missing field [${field}] in request body`}
        } else {
            data[field] = body[field]
        }
    }
    // Fill every optional fields
    for (let field of optionalField){
        if (field in body && body[field] !== '' && body[field] !== null){
            data[field] = body[field]
        }
    }

    // Set the author if there is one field
    if (author){
        data.author = author
    }

    return data

}


module.exports = {
    getAndValidateObjectId,
    getAndValidateDataBody
}