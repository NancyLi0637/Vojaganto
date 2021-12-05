const cloudinary = require('cloudinary')

/**
 * Turn an array of image file pathes into an array storable objects
 * @param {Array} images an array of image files get directly from request
 * @return an array of storable Image objects
 */
const toObject = async (images) => {
    let results = []
    for (let image of images) {
        let result = await cloudinary.uploader.upload(image)
        let img = {
            imageId: result.public_id,
            url: result.url
        }
        results.push(img)
    }

    return results
}

/**
 * Turn an array of image objects in database into an array urls
 * @param {Array} imageObjects an array of image objects stroed in database
 * @return an array of image urls
 */
const toUrl = async (imageObjects) => {
    let results = []
    for (let image of imageObjects) {
        results.push(image.url)
    }

    return results
}

const deleteImage = async (imageObjects) => {
    let results = []
    for (let image of imageObjects) {
        await cloudinary.uploader.destroy(image.imageId)
        results.push(image)
    }
    return results
}

module.exports = {
    toObject,
    toUrl,
    deleteImage
}