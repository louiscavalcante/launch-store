const Product = require('../models/product.js')
const { formatPrice } = require('../lib/utils.js')

module.exports = {
	async index(req, res) {
		let results = await Product.all()
		const products = results.rows

		if (!products) return res.send('Products not found!')

		async function getImage(productId) {
			let results = await Product.files(productId)
			const files = results.rows.map(
				file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`.replace(/\\/g, '/')
			)

			return files[0]
		}

		const productsPromise = products
			.map(async product => {
				product.img = await getImage(product.id)
				product.old_price = formatPrice(product.old_price)
				product.price = formatPrice(product.price)
				return product
			})
			.filter((product, index) => (index > 2 ? false : true))

		const lastAdded = await Promise.all(productsPromise)

		return res.render('home/index', { products: lastAdded })
	},
}
