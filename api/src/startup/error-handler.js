const winston = require("winston")

process.on('uncaughtException', ex => {
    winston.error(ex.message, ex)
    process.exit(1)
})

process.on('unhandledRejection', ex => {
    console.error(ex)
    winston.error(`Unhandled rejection: ${ex.message}`, ex)
    process.exit(1)
})