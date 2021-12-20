const User = require('../models/user.js')
const { decryptAES } = require('../../lib/encryption_handler.js')

function checkAllfields(body) {
	const keys = Object.keys(body)

	for (let key of keys) {
		if (body[key] == '') {
			return {
				user: body,
				error: 'Preencha todos os campos',
			}
		}
	}
}

async function show(req, res, next) {
	const { userId: id } = req.session

	const user = await User.findOne({ where: { id } })

	if (!user) return res.render('user/index', { error: 'Usuário não encontrado' })

	req.user = user

	next()
}

async function post(req, res, next) {
	// check if has all fields
	const fillAllFields = checkAllfields(req.body)
	if (fillAllFields) {
		return res.render('user/register', fillAllFields)
	}

	let { email, cpf_cnpj, password, passwordRepeat } = req.body

	cpf_cnpj = cpf_cnpj.replace(/\D/g, '')

	// check if user exists [email, cpf_cnpj]
	const user = await User.findOne({
		where: { email },
		or: { cpf_cnpj },
	})

	if (user) {
		return res.render('user/register', {
			user: req.body,
			error: 'Usuário já cadastrado!',
		})
	}

	// check if password match
	if (password != passwordRepeat) {
		return res.render('user/register', {
			user: req.body,
			error: 'A senha e a repetição da senha estão incorretas.',
		})
	}

	next()
}

async function update(req, res, next) {
	// check if has all fields
	const fillAllFields = checkAllfields(req.body)
	if (fillAllFields) {
		return res.render('user/index', fillAllFields)
	}

	const { id, password } = req.body

	if (!password)
		return res.render('user/index', {
			user: req.body,
			error: 'Coloque usa senha para atualizar seu cadastro.',
		})

	const user = await User.findOne({ where: { id } })

	// password decryption
	const passwordDecrypted = await decryptAES(user.password)

	if (passwordDecrypted != password)
		return res.render('user/index', {
			user: req.body,
			error: 'Senha incorreta.',
		})

	req.user = user

	next()
}

module.exports = {
	post,
	show,
	update,
}
