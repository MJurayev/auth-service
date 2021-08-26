const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const getAnyTime = require('../utils/Times')
const config = require('config')
const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        min:15
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    //userName started with @ 
    username:{
        type:String
    },
    online:{
        type:Boolean
    }
    // accessToken:{
    //     type:String
    // },
    // refreshToken:{
    //     type:String
    // }

}, {timestamps:true})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.id;
    }
});

const validateUser = (user)=>{
    const schema  = Joi.object({
        username:Joi.string().min(4),
        lastname:Joi.string(),
        firstname:Joi.string().required(),
        phone:Joi.string().pattern(new RegExp("^([+1-9]{4}) ?-?[0-9]{2} ?-?[0-9]{3} ?-?[0-9]{2} ?-?[0-9]{2}$")).required(), // +998998892101 +998-99-889-21-01  +998 29 687 21 06 for uzbek numbers
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email:Joi.string().email({ minDomainSegments: 2}),
        image:Joi.string(),
        online:Joi.boolean()
    })

    return schema.validate(user)
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
    {
        _id: this._id, 
        phone:this.phone,
        firstname:this.firstname,
        lastname:this.lastname,
        isVerified:this.isVerified,
        image:this.image,
        email:this.email,
        username:this.username
    },
    config.get('JWT_SECRET'), 
    { expiresIn:"15m" });
    return token;
  }

const validateUserForUpdate = (user)=>{
    const schema  = Joi.object({
        username:Joi.string().alphanum().min(4),
        lastname:Joi.string().alphanum(),
        firstname:Joi.string().alphanum(),
        phone:Joi.string().pattern(new RegExp("^([+1-9]{4}) ?-?[0-9]{2} ?-?[0-9]{3} ?-?[0-9]{2} ?-?[0-9]{2}$")), // +998998892101 +998-99-889-21-01  +998 29 687 21 06 for uzbek numbers
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
        email:Joi.string().email({ minDomainSegments: 2}),
        image:Joi.string(),
        online:Joi.boolean()
    })

    return schema.validate(user)
}

const checkUsernameExist =async (username) => {
    const user = await User.findOne({username:username})
    if(user)
        return true 
    return false
}

const checkPhoneExist =async (phone) => {
    const user = await User.findOne({phone:phone})
    if(user)
        return true
    return false
}

const checkEmailExist =async (email) => {
    const user = await User.findOne({email:email})
    if(user)
        return true
    return false
}

const User = mongoose.model('Users', userSchema)
module.exports={User, validateUser , checkEmailExist ,validateUserForUpdate, checkUsernameExist, checkPhoneExist} 


