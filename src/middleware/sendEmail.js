const nodemailer = require('nodemailer');

const sendEmail = {};

sendEmail.sendEmail = (emailAdmin,action,htmlContent,service) => {
	const transporter = nodemailer.createTransport({
		host: process.env.HOST_EMAIL,
		port: process.env.PORT_EMAIL,
		secure: false,
		auth: {
			user: process.env.USER_EMAIL,
			pass: process.env.PASS_EMAIL
		},
		tls: {
			rejectUnauthorize: false
		}
	})

	const info = transporter.sendMail({
		from:` '${service}'`,
		to: emailAdmin,
		subject: action,
		html: htmlContent,
    })
    
    return info;
}


module.exports = sendEmail;