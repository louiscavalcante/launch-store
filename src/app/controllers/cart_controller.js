const Cart = require('../../lib/cart.js')

const LoadProductsService = require('../services/load_product_service.js')

module.exports = {
	async index(req, res) {
		try {
			let { cart } = req.session

			cart = Cart.init(cart)

			return res.render('cart/index', { cart })
		} catch (err) {
			console.error(err)
		}
	},
	async addOne(req, res) {
		try {
			const { id } = req.params

			const product = await LoadProductsService.load('product', { where: { id } })
			let { cart } = req.session

			cart = Cart.init(cart).addOne(product)

			req.session.cart = cart

			return res.redirect('/cart')
		} catch (err) {
			console.error(err)
		}
	},
	removeOne(req, res) {
		try {
			let { id } = req.params

			let { cart } = req.session

			if (!cart) return res.redirect('/cart')

			cart = Cart.init(cart).removeOne(id)

			req.session.cart = cart

			return res.redirect('/cart')
		} catch (err) {
			console.error(err)
		}
	},
	delete(req, res) {
		try {
			let { id } = req.params

			let { cart } = req.session

			if (!cart) return

			req.session.cart = Cart.init(cart).delete(id)

			return res.redirect('/cart')
		} catch (err) {
			console.error(err)
		}
	},
}
