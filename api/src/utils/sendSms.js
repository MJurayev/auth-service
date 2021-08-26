
const config = require('config')
const twilio = require('twilio')

const accountSID = config.get('TWILIO_ACCOUNT_SID')
const authToken = config.get('TWILIO_AUTH_TOKEN')
const virtualNumber = config.get("TWILIO_NUMBER")
const client = twilio(accountSID, authToken)

const sendSMS=async(phone, code) =>{
    const reciever = process.env.NODE_ENV === "production" ? phone : "+998996672106"
    client.messages.create({
        body:"Verify your telephone. Your code is:" + code,
        from:virtualNumber,
        to:phone
    }).then((message)=>{
        console.log(message)
    })
    console.log(`SMS send to ${phone} code : ${code}`)
    return true
}

module.exports = sendSMS