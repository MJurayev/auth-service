const { MulterError } = require("multer")
const { InternalServerErrorResponse, FailureResponse } = require("../../core/ApiResponse")
const { uploadProfileImage } = require("../utils/upload")

const uploadImage=(req, res, next)=>{
    uploadProfileImage(req, res, (err)=>{
        if(err instanceof MulterError){
            return new FailureResponse("Bad Request").send(res)
        }else{
            return new InternalServerErrorResponse().send(res)
        }
    })
    next()
}

module.exports = { uploadImage }