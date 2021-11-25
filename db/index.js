// Reference: lecture code
const mongoose = require('mongoose')

/* Connect to database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/csc309-project'

mongoose.connect(mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database.")
    })
    .catch((error) => {
        console.log(error)
        console.log('Error connecting to mongodb. Timeout reached.')
    })

module.exports = { mongoose }