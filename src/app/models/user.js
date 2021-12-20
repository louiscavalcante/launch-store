const db = require('../../config/db.js')
const { encryptAES } = require('../../lib/encryption_handler.js')
const fs = require('fs')
const Product = require('../models/product.js')

module.exports = {
	async findOne(filters) {
		let query = 'SELECT * FROM users'

		Object.keys(filters).map(key => {
			// WHERE | OR | AND
			query = `${query}
			${key}
			`

			Object.keys(filters[key]).map(field => {
				query = `${query}
				${field} = '${filters[key][field]}'
				`
			})
		})

		const results = await db.query(query)

		return results.rows[0]
	},
	async create(data) {
		try {
			const query = `
			INSERT INTO users (
				name,
				email,
				password,
				cpf_cnpj,
				cep,
				address
			) VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id
		`
			const values = [
				data.name,
				data.email,
				await encryptAES(data.password),
				data.cpf_cnpj.replace(/\D/g, ''),
				data.cep.replace(/\D/g, ''),
				data.address,
			]

			const results = await db.query(query, values)

			return results.rows[0].id
		} catch (err) {
			console.error(err)
		}
	},
	async update(id, fields) {
		let query = 'UPDATE users SET'

		Object.keys(fields).map((key, index, array) => {
			if (index + 1 < array.length) {
				query = `${query}
				${key} = '${fields[key]}',`
			} else {
				// last iterator of array doesnt have -> , at the end
				query = `${query}
				${key} = '${fields[key]}'
				WHERE id = ${id}`
			}
		})

		await db.query(query)
		return
	},
	async delete(id) {
		let results = await db.query('SELECT * FROM products WHERE user_id = $1', [id])
		const products = results.rows

		const allFilesPromise = products.map(product => Product.files(product.id))

		let promiseResults = await Promise.all(allFilesPromise)

		await db.query('DELETE FROM users WHERE id = $1', [id])

		promiseResults = promiseResults.map(results => {
			results.rows.map(file => {
				try {
					fs.unlinkSync(file.path)
				} catch (err) {
					console.error(err)
				}
			})
		})
	},
}
