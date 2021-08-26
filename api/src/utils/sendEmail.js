const config = require('config');
const nodemailer = require('nodemailer')

 const transport =  nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth: {
      user:config.get('EMAIL'),
      pass: config.get('EMAIL_PASSWORD'),
    },
  });

const sendEmail = async (email, code) => {
    const message = {
        from:config.get('EMAIL'),
        to: email,
        subject: `Confirm your email`,
        html: `<p>Your confirmation code is:<b>${code}</b></p>`
      };
    const sended =await transport.sendMail(message)
    return sended
}

module.exports = { sendEmail }
