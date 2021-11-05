const db = require('../config/db.js')

module.exports = {
	all() {
		return db.query(`
            SELECT * FROM categories
        `)
	},
}
