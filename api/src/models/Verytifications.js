const mongoose = require('mongoose')

const verifySchema =  mongoose.Schema({
    login:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    success:{
        type:Boolean,
        default:false
    },
    expiry:Date
}, { timestamps:true })
verifySchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expiry
});

verifySchema.set('toJSON', {
    virtuals:true
})
const Verytifications = mongoose.model("Verytifications",verifySchema)

module.exports = { Verytifications }