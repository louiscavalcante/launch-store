const User = require('../models/User')
const { decryptAES } = require('../../lib/encryption_handler.js')

async function login(req, res, next) {
	const { email, password } = req.body

	const user = await User.findOne({ where: { email } })

	if (!user) return res.render('session/login', { user: req.body, error: 'Usuário não cadastrado!' })

	// password decryption
	const passwordDecrypted = decryptAES(user.password)

	if (passwordDecrypted != password)
		return res.render('session/login', {
			user: req.body,
			error: 'Senha incorreta.',
		})

	req.user = user

	next()
}

module.exports = {
	login,
}
