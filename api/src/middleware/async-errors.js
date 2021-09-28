const winston = require("winston")
const { InternalServerErrorResponse } = require("../../core/ApiResponse")

module.exports = function(err, req, res, next){
    winston.error( err.message, err)
    console.log(JSON.stringify(err))
    return new InternalServerErrorResponse().send(res)
}