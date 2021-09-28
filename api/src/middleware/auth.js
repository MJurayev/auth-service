const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/Users')
const { AuthenticationError, ForbiddenResponse, NotFoundResponse } = require('../../core/ApiResponse')
module.exports = function auth(req, res , next){
    const token = req.header('auth-service-token')
    if(!token)
        return res.status(401).send("Token not found")
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        if(!decoded)
            return new AuthenticationError("access token is expired").send(res)        
        User.findOne({_id:decoded._id}).then(user=>{
            req.user = user;
            next();
        }).catch(err=>{
            return new ForbiddenResponse().send(res)
        })
    }
    catch (ex) {
        console.log(ex)
        return new AuthenticationError('Yaroqsiz token').send(res)
    }
}