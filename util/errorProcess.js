const errorProcess = function(error){
    if(!error.status){
        return {msg: error, status: 400}
    }
    return error
}

module.exports = errorProcess