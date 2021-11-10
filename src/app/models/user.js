const db = require('../../config/db.js')
const { encrypt } = require('../../lib/encryption_handler.js')

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

			// password encryption
			const passwordEncrypted = encrypt(data.password, process.env.ENCRYPTION_KEY)

			const values = [
				data.name,
				data.email,
				passwordEncrypted,
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
}
