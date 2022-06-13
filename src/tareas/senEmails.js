const nodemailer = require("nodemailer");

const sendEmail = (datos) => {
    
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'correo@gmail.com',
            pass: 'contrasena'
        }
    });

    const message = {
        from: 'relme35rd.academica@gmail.com',
        to: datos.correo,
        subject: 'Carta de Reconocimiento',
        attachments: [
            { 
                filename: datos.archivo,
                path: `${datos.direccion}/${datos.archivo}`
            }
        ]
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    sendEmail: sendEmail
}