const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/Users')
const sendSMS = require('../utils/sendSms')
const { Verytifications } = require('../models/Verytifications')
const {getAnyTime} = require('../utils/Times')
const _ = require('lodash')
const { makeResponse }= require('../utils/response') 
const { RefreshToken, generateRefreshToken } = require('../models/Tokens')
const { sendEmail } = require('../utils/sendEmail')
const { generateCode } = require('../utils/generateCode')

//user login qilish uchun controller

const UserLogin = async (data, ipAddress) =>{
    
    const { password, login, type } = data
    
    if(type!=='email' && type !== "phone")
        return makeResponse(400, {error:"login type is required"})

    const user = await User.findOne({[type]:login}) 
    if(!user)
        return makeResponse(400, { error:"Phone/email or password not valid" })
       
    if(!user.isVerified)
        return makeResponse(400, { error:"Phone or email is not verified. Please verify your phone or email" })

    const valid =await bcrypt.compare(password, user.password)
    
    if(!valid)
    return makeResponse(400, { error:"Phone/email or password not valid" })
    const token = user.generateAuthToken()
    
    const refreshTokenInstance = new RefreshToken({
            user: user.id,
            token:generateRefreshToken(),
            expires: new Date(Date.now() + 7*24*60*60*1000),
            createdByIp: ipAddress
    })
    
    const refreshToken = await refreshTokenInstance.save()
    if(!refreshToken)
        throw new Error({error:"Something went wrong!!!"})
        return makeResponse(200, { access_token:token, refresh_token:refreshToken.token })
}

// access yoken expired bo'lgandan keyin access tokenni refresh qilish uchun
const RequestTokenRefresh =async (refreshToken, ipAddress) => {

    
    const currentRefreshToken = await RefreshToken.findOne({token:refreshToken}).populate('user')
    
    if(!currentRefreshToken)
        return makeResponse(404, { error:"Token not found" })
    console.log(currentRefreshToken.user)
    if(currentRefreshToken.isExpired)
        return makeResponse(401, {error:"Refresh token is expired"})
    const { user } = currentRefreshToken
    const newRefreshToken = generateRefreshToken()
    currentRefreshToken.revoked = Date.now()
    currentRefreshToken.revokedByIp = ipAddress
    currentRefreshToken.replacedByToken = newRefreshToken
    await currentRefreshToken.save()

    const newRefreshTokenInstance = new RefreshToken({
            user: user._id,
            token:generateRefreshToken(),
            expires: new Date(Date.now() + 7*24*60*60*1000),
            createdByIp: ipAddress
    })

    const accessToken = user.generateAuthToken()
    const savedNewRefreshToken = await newRefreshTokenInstance.save()
    if(!savedNewRefreshToken)
         throw new Error({error:"Something went wrong"})

    return makeResponse(200, { refresh_token:savedNewRefreshToken.token, access_token:accessToken})
}

//User sign up dan keyin phone ga sms code jo'natiladi , yoki parolni unutilganda sms jo'natiladi
const RequestSendSmsWrite =async (login,type ) => {
    if(type!=='email' && type !== "phone")
        return makeResponse(400, {error:"login type is required"})

    if(!login)
        return makeResponse(400,{error:"Phone/email is note valid"})
    const code = generateCode()
    if(type==="phone"){
        if(!sendSMS(login, code))
            throw new Error({ error:"Something went wrong!!" })
    }else if(type==="email"){
        if(!await sendEmail(login, code))
        makeResponse(500, { message:"Sending Error" })
    }
    
    const expiry = getAnyTime(300)
    var saved;
    
    const founded =await  Verytifications.findOne({login, type})
    if(founded){
        saved = await Verytifications.findOneAndUpdate({login, type}, {expiry:expiry,type, code:code, success:false }, {new :true})
        console.log(saved)
    }else{
        const verify = new Verytifications({login ,code ,type, expiry, success:false})
        saved = await verify.save()
    }
    if(saved)
        return makeResponse(200, {expiry:expiry})
    return makeResponse(400, { error:"Something went wrong!!!"})
}


//send sms dan keyin tasdiqlash uchun  agar password bo'lsa password yangilanadi
//forgot password
const ConfirmCodeWithPhone =async (data) => {
    const { login, code, password, type } = data
    if(type!=='email' && type !== "phone")
        return makeResponse(400, {error:"login type is required"})
    const verification = await Verytifications.findOne({login, success:false})

    if(!verification)
        return makeResponse(404, {error:"Phone/email is not found"})

    if(verification.isExpired)
        return makeResponse(400, {error:"this Code has expired"})
    if( code && verification.code === code ){
        const updated = await Verytifications.findOneAndUpdate({login, type }, {
            code:"",
            expiry:null,
            success:true
        }, {new:true})
        
        if(!updated)throw Error("Something went wrong")
        if(!password){
                const verifiedUser = await User.findOneAndUpdate({[type]:login}, {isVerified:true}, {new :true})
                if(!verifiedUser)throw Error("Something went wrong: User is not registered")
            return makeResponse(200, {success:"Succeessfully verified"})
        }else{
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            const updatedUser = await User.findOneAndUpdate({[type]:login}, {isVerified:true, password:passwordHash}, {new:true})
            if(!updatedUser)
                return makeResponse(404, { error:"User not found" })
            
            return makeResponse(200, {success:"Succeessfully update password"})
        } 
    }
    return makeResponse(404, {error:"code has expired" })
}


// user login qilgandan keyin tokenni haqiqiy ligini ko'rish uchun
const CheckToken =async (info) => {
    const tempUser = await User.findOne({_id:info._id, isVerified:true})
    if(!tempUser)
        return makeResponse(401, {error:"invalid token"})
    const user = JSON.parse(JSON.stringify(tempUser))
    return makeResponse(200,user)
}

const RecoverPassword = async () => {
    return makeResponse(200, { success:"Response successfully sended" })
}


module.exports = {UserLogin , RequestSendSmsWrite, ConfirmCodeWithPhone , CheckToken,RequestTokenRefresh, RecoverPassword}