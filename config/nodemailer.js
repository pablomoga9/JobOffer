const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        user: "poner con .env dirección email a la que se mandarán los correos",
        pass: "poner contraseña de la dirección de email"
    }

});

module.exports = transporter;