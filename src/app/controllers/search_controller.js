const Product = require('../models/product.js')
const LoadProductService = require('../services/load_product_service.js')

module.exports = {
	async index(req, res) {
		try {
			let { filter, category } = req.query

			if (!filter || filter.toLowerCase() == 'Toda a Loja') filter = null

			let products = await Product.search({ filter, category })

			const productsPromise = products.map(LoadProductService.format)

			products = await Promise.all(productsPromise)

			const search = {
				term: req.query.filter || 'Toda a Loja',
				total: products.length,
			}

			const categories = products
				.map(product => ({
					id: product.category_id,
					name: product.category_name,
				}))
				.reduce((categoriesFiltered, category) => {
					const found = categoriesFiltered.some(cat => cat.id == category.id)

					if (!found) categoriesFiltered.push(category)

					return categoriesFiltered
				}, [])

			return res.render('search/index', { products, search, categories })
		} catch (err) {
			console.error(err)
		}
	},
}
