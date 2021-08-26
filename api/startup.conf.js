const { existsSync, mkdirSync} = require('fs')

if(!existsSync('uploads'))
    mkdirSync('uploads')
