const express = require('express')
const userRoute = require('../routes/userRoute')
const authRoute = require('../routes/authRoute')

const asyncErrors =require('../middleware/async-errors')
module.exports = function (app){
    app.use(express.json())
    app.get('/', (req, res) => {
        return res.send('auth_service is running...')
    })
    app.use('/api/users',userRoute)
    app.use('/api/auth',authRoute)
    app.use(asyncErrors)
}