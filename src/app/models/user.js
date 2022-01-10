const Base = require('../models/base.js')

Base.init({ table: 'users' })

module.exports = {
	...Base,
}
