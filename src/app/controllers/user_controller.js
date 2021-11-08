const User = require('../models/user.js')

module.exports = {
	registerForm(req, res) {
		return res.render('user/register')
	},
	async post(req, res) {
		return res.send('User passed!')
	},
}
