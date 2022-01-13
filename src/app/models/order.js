const Base = require('../models/base.js')

Base.init({ table: 'orders' })

module.exports = {
	...Base,
}
