const Base = require('../models/base.js')

Base.init({ table: 'categories' })

module.exports = {
	...Base,
}
