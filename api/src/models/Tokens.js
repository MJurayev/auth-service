const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const tokenSchema =new mongoose.Schema( {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    token:{
        type:String
    },
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
})

tokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

tokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

tokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.user;
    }
});

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex')
}
const RefreshToken = mongoose.model('RefreshToken', tokenSchema)
module.exports = { RefreshToken,generateRefreshToken }