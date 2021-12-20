const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '1ecb0c79e2e699',
		pass: '203dae3d3d6733',
	},
})
