const crypto = require('crypto')
const User = require('../models/user.js')
const mailer = require('../../lib/mailer.js')
const { encryptAES } = require('../../lib/encryption_handler.js')

module.exports = {
	loginForm(req, res) {
		return res.render('session/login')
	},
	login(req, res) {
		req.session.userId = req.user.id

		return res.redirect('/users')
	},
	logout(req, res) {
		req.session.destroy()
		return res.redirect('/')
	},
	forgotForm(req, res) {
		return res.render('session/forgot-password')
	},
	async forgot(req, res) {
		const user = req.user

		try {
			const token = crypto.randomBytes(20).toString('hex')

			let now = new Date()
			now = now.setHours(now.getHours() + 1)

			await User.update(user.id, {
				reset_token: token,
				reset_token_expires: now,
			})

			await mailer.sendMail({
				to: user.email,
				from: 'no-reply@launchstore.com.br',
				subject: 'Launchstore: Recuperação de senha',
				html: `
<h2>Perdeu a senha?</h2>
<p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
<p>
	<a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">RECUPERAR SENHA</a>
</p>
			`,
			})

			return res.render('session/forgot-password', {
				success: 'Verifique seu e-mail para resetar sua senha!',
			})
		} catch (err) {
			console.error(err)
			return res.render('session/forgot-password', {
				error: 'Ocorreu um erro ao enviar o e-mail!',
			})
		}
	},
	resetForm(req, res) {
		return res.render('session/password-reset', { token: req.query.token })
	},
	async reset(req, res) {
		const user = req.user
		const { password, token } = req.body

		try {
			const newPassword = await encryptAES(password)

			await User.update(user.id, {
				password: newPassword,
				reset_token: '',
				reset_token_expires: '',
			})

			return res.render('session/login', {
				user: req.body,
				success: 'Senha atualizada com sucesso! Faça seu login com a nova senha.',
			})
		} catch (err) {
			console.error(err)
			return res.render('session/password-reset', {
				user: req.body,
				token,
				error: 'Ocorreu um erro ao resetar sua senha!',
			})
		}
	},
}
