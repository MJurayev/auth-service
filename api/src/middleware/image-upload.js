const { MulterError } = require("multer")
const { uploadProfileImage } = require("../utils/upload")

const uploadImage=(req, res, next)=>{

    uploadProfileImage(req, res, (err)=>{
        if(err instanceof MulterError){
            res.status(400).send(err)
        }else{
            res.status(500).send("Something went wrong")
        }
    })
    next()
}

module.exports = { uploadImage }