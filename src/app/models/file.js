const Base = require('../models/base.js')

Base.init({ table: 'files' })

module.exports = {
	...Base,
}
