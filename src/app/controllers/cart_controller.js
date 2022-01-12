const Cart = require('../../lib/cart.js')

const LoadProductsService = require('../services/load_product_service.js')

module.exports = {
	async index(req, res) {
		try {
			const product = await LoadProductsService.load('product', { where: { id: 2 } })
			let { cart } = req.session

			cart = Cart.init(cart).addOne(product)

			return res.render('cart/index', { cart })
		} catch (err) {
			console.error(err)
		}
	},
}
