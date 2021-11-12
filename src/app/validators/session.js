const User = require('../models/User')
const { decryptAES } = require('../../lib/encryption_handler.js')
const { setTimeout } = require('timers/promises')

async function login(req, res, next) {
	const { email, password } = req.body

	const user = await User.findOne({ where: { email } })

	if (!user)
		// Dont't display the display the exact field that was wrong (email / password)
		return res.render('session/login', { user: req.body, error: 'Email ou senha inválidos!' })

	// password decryption
	const passwordDecrypted = await decryptAES(user.password)

	if (passwordDecrypted != password)
		// Dont't display the display the exact field that was wrong (email / password)
		return res.render('session/login', {
			user: req.body,
			error: 'Email ou senha inválidos!',
		})

	req.user = user

	next()
}

async function forgot(req, res, next) {
	const { email } = req.body

	try {
		const user = await User.findOne({ where: { email } })

		// Fake success message with delay for security reasons!
		if (!user) {
			await setTimeout(Math.floor(Math.random() * (2800 - 2500 + 50) + 2500))
			return res.render('session/forgot-password', {
				success: 'Verifique seu e-mail para resetar sua senha!',
			})
		}

		req.user = user

		next()
	} catch (error) {
		console.log(error)
	}
}

async function reset(req, res, next) {
	const { email, password, passwordRepeat, token } = req.body

	const user = await User.findOne({ where: { email } })

	if (!user)
		return res.render('session/password-reset', {
			user: req.body,
			token,
			error: 'Usuário não existe!',
		})

	if (passwordRepeat != password)
		return res.render('session/password-reset', {
			user: req.body,
			token,
			error: 'A repetição de senha não está igual!',
		})

	if (token != user.reset_token)
		return res.render('session/password-reset', {
			user: req.body,
			token,
			error: 'Token inválido! Solicite uma nova recuperação de senha.',
		})

	let now = new Date()
	now = now.setHours(now.getHours())

	if (now > user.reset_token_expires)
		return res.render('session/password-reset', {
			user: req.body,
			token,
			error: 'Token expirado! Solicite uma nova recuperação de senha.',
		})

	req.user = user

	next()
}

module.exports = {
	login,
	forgot,
	reset,
}
