const { UserPost } = require('../controllers/UserController')
const { UserLogin, RequestSendSmsWrite, ConfirmCodeWithPhone , CheckToken, RequestTokenRefresh} = require('../controllers/AuthController')
const auth = require('../middleware/auth')
const { uploadProfileImage } = require('../utils/upload')
const { isSuccessCode } = require('../utils/analyze-status-code')
const fs = require('fs')
const path = require('path')
const router = require('express').Router()

router.post('/sign-up',uploadProfileImage, async (req, res) => {

    const image = req.file && req.file.filename
    const user = await UserPost({...req.body,image})
    
    if(!isSuccessCode(user.status) && req.file)
        fs.rm(path.resolve(req.file.path), {force:true}, (err)=>{
            if(err){
                throw err
            }
            console.log("deleted:"+image)
    })
    res.status(user.status).header(user.headers).send(user.body)
})
router.post('/request-send-sms', async(req, res) => {
    const { login, type } = req.body
    const response = await RequestSendSmsWrite(login, type)
    res.status(response.status).header(response.headers).send(response.body)
})

router.post('/confirm', async (req, res) => {
    const response = await ConfirmCodeWithPhone(req.body)
    res.status(response.status).header(response.headers).send(response.body)
})

router.post('/login', async (req, res) => {
    // throw new Error('Something')

    const user = await UserLogin(req.body, req.ip)
    res.status(user.status).header(user.headers).send(user.body)
})

router.post('/revoke-token',async (req, res) => {
    const { refreshToken } = req.body
    const response =await RequestTokenRefresh(refreshToken, req.ip)
    res.status(response.status).header(response.headers).send(response.body)
})
//req. user headerdagi x-auth-token dan decode qilinib olinadi
router.get('/check-user', auth, async (req, res) => {
    const response = await CheckToken(req.user)
    return res.status(response.status).send(response.body)
})

router.post('/change-password', async (req, res) => {
        const { phone } = req.body
        res.send("success")
})
module.exports = router