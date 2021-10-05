require('dotenv').config()
require('express-async-errors')
const express = require('express')
const config = require('config')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const winston = require('winston')
const sendSMS = require('./src/utils/sendSms')

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use( '/uploads',express.static('uploads'))
app.use( express.static('build'))


//startups
require('./src/startup/logger')
require('./src/startup/db')
require('./src/startup/routes')(app)

if(!config.get('JWT_SECRET')){
  winston.error('JWT_SECRET o\'zgaruvchisi aniqlanmadi', "App.js 21-qator")
  process.exit(1)
}
const port = process.env.PORT || 8000
const env = process.env.NODE_ENV || 'development'
http.listen(port,()=>{
  console.info(`${port} da- ${env} server ishlayapti....`)
  winston.info(`${port} da- ${env} server ishlayapti....`)
})
