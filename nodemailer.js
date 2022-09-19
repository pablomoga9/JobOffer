const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2
const config = require('./config.js');


const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token : config.refreshToken})


function send_mail(recipient,url){
    const accesToken = OAuth2_client.getAccessToken();
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: config.user,
            pass:process.env.EMAIL_PASS,
            clientId: config.clientId,
            clientSecret:config.clientSecret,
            refreshToken:config.refreshToken,
            accessToken:accesToken
        },
        tls: {
            rejectUnauthorized: false
        }
    
    });

    const mail_options = {
        from: `JobScanner <${config.user}>`,
        to:recipient,
        subject:'Recuperar contraseña',
        html:get_html_message(url)
    }

    transport.sendMail(mail_options, function(error,result){
        if(error){
            console.log('Error: ',error)
        }
        else{
            console.log('Success: ', result);
        }
        transport.close()
    })


}

function get_html_message(url){
    return `
    <h3>Haz click en el siguiente link y rellena el formulario para cambiar tu contraseña</h3>
    <a href="${url}">Click aquí</a>
    `
}

// send_mail('Pablo','moyagarcia99@gmail.com')


// module.exports = 
// {
//     transporter,
//     clientId:'511326231976-gdclv6h0g48sqrl3m6f0povsnd2k7t8k.apps.googleusercontent.com',
//     clientSecret:'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',
//     refreshToken:'1//04ZO57TlqEQxvCgYIARAAGAQSNwF-L9IrYkEQaqb5uV0k5IkESQNAJJR7g3h-jFHqPXOAQywcnA3OrGiLWK7v7m2LohO0CEJMsso' 
// }

module.exports = {send_mail}