const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/Users')
module.exports = function auth(req, res , next){
    const token = req.header('auth-service-token')
    if(!token)
        return res.status(401).send("Token not found")
    try {
        const decoded = jwt.verify(token, config.get('JWT_SECRET'));
        if(!decoded)
            return res.status(401).send({error:"access token is expired"})
        
        User.findOne({_id:decoded._id}).then(user=>{
            req.user = user;
            next();
        }).catch(err=>{
            return res.status(403).send({error:'Forbidden Access'})
        })
    }
    catch (ex) {
        console.log(ex)
        return res.status(401).send('Yaroqsiz token');
    }
}