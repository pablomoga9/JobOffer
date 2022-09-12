const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    sendmail:true,
    secure: true,
    auth: {
        user: process.env.EMAIL_DIR,
        pass: process.env.EMAIL_PASS
    }

});

module.exports = transporter;