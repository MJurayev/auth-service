require('winston-mongodb')
const config = require('config')
const winston = require('winston')
winston.add(new winston.transports.File({filename:"logs/log.txt"}))
winston.add(new winston.transports.MongoDB({db:`${config.get('DATABASE_URI')}/auth-service`, collection:"logs", options:{ useUnifiedTopology:true, useNewUrlParser: true }  }))