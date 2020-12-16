
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})

const send = (userEmail: string, processID: string) => {
    const mailOptions = {
        from: "Literay association",
        to: userEmail,
        subject: "ACTIVATION LINK",
        html: `<a href=${process.env.BASE_URL}/activate-reader/${processID}> Click here to activate your account </a>`
    }
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default { send }