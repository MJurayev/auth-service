const multer = require('multer')
const path = require('path')

const allowedMimes = ['image/jpeg', 'image/png','image/gif']
const allowedExt = ['.gif', '.png', '.jpeg', '.jpg']

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileInfo = path.parse(file.originalname)
        if(!allowedExt.includes(fileInfo.ext) && !allowedMimes.includes(file.mimetype)){
            return cb("Fayl turi mos kelmaydi", false)
        }
        const uniqueSuffix =`${Date.now()}-${Math.round(Math.random() * 1E9)}${fileInfo.ext}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const uploadProfileImage = multer({ storage: storage }).single('image')
  module.exports =  { uploadProfileImage }