const Base = require('../models/base.js')

Base.init({ table: 'files' })

module.exports = {
	...Base,
}

// async delete(id) {
// 	try {
// 		const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
// 		const file = result.rows[0]

// 		fs.unlinkSync(file.path)
// 	} catch (err) {
// 		console.log(err)
// 	}

// 	return db.query(`DELETE FROM files WHERE id = $1`, [id])
// },
