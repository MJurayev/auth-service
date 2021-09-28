const { User, validateUser, validateUserForUpdate, checkPhoneExist } = require('../models/Users')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const path = require('path')
const { makeResponse } = require('../utils/response')
/*
    @body -data  ->  { username, lastname, firstname,email,... }
*/
const UserPost = async (data) => {
    const validation =  validateUser(data)
    if (validation.error)
        return makeResponse(400, { error:validation.error.details[0].message })
    
    const { phone, password, image, firstname, lastname , email } = data

    const resolveImage =image ? `/uploads/${image}` : undefined

    if (phone && await checkPhoneExist(phone))
        return makeResponse(400, { error:"Phone already registered!!" })
    const user = new User({
        password,
        firstname,
        lastname,
        email, 
        phone, 
        image:resolveImage
    })

    const salt =await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
   
    if (!await user.save())
        return makeResponse(500, { error:"Database Error!!!" })
    return  makeResponse(201,user)
}

/*
    @body -data  ->  { username, lastname, firstname,email,... } userObject
*/
const UserPut = async ( id,data) => {

    const validation =  validateUserForUpdate(data)
    if (validation.error)
        return  makeResponse(400,{error:validation.error.details[0].message})

    const foundUser = await User.findOne({ _id: id })
      
    if (foundUser && foundUser.phone && data.phone && foundUser.phone !== data.phone && await checkPhoneExist(data.phone))
        return  makeResponse(400,{error:"Phone already registered!!"})

    const updatedUser = await User.findOneAndUpdate({ _id: id }, data, { new: true })
    if (!updatedUser)
        return  makeResponse(500,{error:"Database Error!!"})

    const temp = JSON.parse(JSON.stringify(updatedUser))
    delete temp.password
    return  makeResponse(200,temp)
    
}

const UserGetAll = async ()=>{
    const users = await User.find({})

    return makeResponse(200, users)
}


const UserDelete = async (id) => {
    const user = await User.findOneAndDelete({_id:id})
    if(!user)
        return { status:404 , response:"User not found" }
    
    return makeResponse(200 ,user)
}

module.exports = {
    UserPost,
    UserPut,
    UserGetAll,
    UserDelete
}