const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        user: process.env.EMAIL_DIR,
        pass: process.env.EMAIL_PASS
    }

});

module.exports = transporter;