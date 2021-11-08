const User = require('../models/User')

async function post(req, res, next) {
	// check if has all fields
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == '') {
			return res.send('Please, fill all fields')
		}
	}

	let { email, cpf_cnpj, password, passwordRepeat } = req.body

	cpf_cnpj = cpf_cnpj.replace(/\D/g, '')

	// check if user exists [email, cpf_cnpj]
	const user = await User.findOne({
		where: { email },
		or: { cpf_cnpj },
	})

	if (user) return res.send('User already exists!')

	// check if password match
	if (password != passwordRepeat) return res.send('Passwords do not match!')

	next()
}

module.exports = {
	post
}
