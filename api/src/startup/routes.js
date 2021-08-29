const express = require('express')
const path = require('path')
const userRoute = require('../routes/userRoute')
const authRoute = require('../routes/authRoute')

const asyncErrors =require('../middleware/async-errors')
module.exports = function (app){
    app.get(new RegExp("^(?!(/api|/uploads))/?"),async (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'build/index.html'))
    })
    app.use(express.json())
    app.use('/api/users',userRoute)
    app.use('/api/auth',authRoute)
   
    app.use(asyncErrors)
}