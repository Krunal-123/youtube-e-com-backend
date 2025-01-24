const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

const signupMail = (email, firstName, lastName, gender, number, password, Date) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: 'krunalparmar246@gmail.com',
        subject: 'New Person SingUp',
        html: `
        <span>${Date}</span>
        <h2>PersonName:- ${firstName} ${lastName},</h2>
        <h3>Gender:- ${gender}</h3>
        <h3>Phone No:- ${number}</h3>
        <h3>Email:- ${email}</h3>
        <h3>Password:- ${password}</h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent: ' + info.response);
        }
    });
};

module.exports = signupMail;
