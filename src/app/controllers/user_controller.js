const User = require('../models/user.js')
const Product = require('../models/product.js')
const LoadProductService = require('../services/load_product_service.js')
const { unlinkSync } = require('fs')
const { encryptAES } = require('../../lib/encryption_handler.js')
const { formatCpfCnpj, formatCep } = require('../../lib/utils.js')

module.exports = {
	registerForm(req, res) {
		return res.render('user/register')
	},
	async show(req, res) {
		try {
			const { user } = req

			user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
			user.cep = formatCep(user.cep)

			return res.render('user/index', { user })
		} catch (err) {
			console.error(err)
		}
	},
	async post(req, res) {
		try {
			let { name, email, password, cpf_cnpj, cep, address } = req.body

			password = await encryptAES(password)
			cpf_cnpj = cpf_cnpj.replace(/\D/g, '')
			cep = cep.replace(/\D/g, '')

			const userId = await User.create({
				name,
				email,
				password,
				cpf_cnpj,
				cep,
				address,
			})

			req.session.userId = userId

			return res.redirect('/users')
		} catch (err) {
			console.error(err)
		}
	},
	async update(req, res) {
		try {
			const { user } = req
			let { name, email, cpf_cnpj, cep, address } = req.body

			cpf_cnpj = cpf_cnpj.replace(/\D/g, '')
			cep = cep.replace(/\D/g, '')

			await User.update(user.id, {
				name,
				email,
				cpf_cnpj,
				cep,
				address,
			})

			return res.render('user/index', {
				user: req.body,
				success: 'Usuário atualizado com sucesso!',
			})
		} catch (err) {
			console.error(err)
			return res.render('user/index', {
				error: 'Aconteceu algum erro!',
			})
		}
	},
	async delete(req, res) {
		try {
			const products = await Product.findAll({ where: { user_id: req.body.id } })

			const allFilesPromise = products.map(product => Product.files(product.id))

			let promiseResults = await Promise.all(allFilesPromise)

			await User.delete(req.body.id)
			req.session.destroy()

			promiseResults.map(results => {
				results.map(file => {
					try {
						unlinkSync(file.path)
					} catch (err) {
						console.error(err)
					}
				})
			})

			return res.render('session/login', {
				success: 'Usuário deletado com sucesso!',
			})
		} catch (err) {
			console.error(err)
			return res.render('user/index', {
				user: req.body,
				error: 'Erro ao tentar deletar sua conta!',
			})
		}
	},
	async ads(req, res) {
		const products = await LoadProductService.load('products', {
			where: { user_id: req.session.userId },
		})

		return res.render('user/ads', { products })
	},
}
