const mongoose = require('mongoose')
const config = require('config')

const uri = config.get('DATABASE_URI')
    
mongoose.connect(`${uri}/auth-service`,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify:false})
.then(()=>{
    console.log(`${uri} - Connected Database`)
})