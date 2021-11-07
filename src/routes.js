const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer.js')
const ProductController = require('./app/controllers/product_controller.js')
const HomeController = require('./app/controllers/home_controller.js')
const SearchController = require('./app/controllers/search_controller.js')

//! Home
routes.get('/', HomeController.index)

//! Search
routes.get('/products/search', SearchController.index)

//! Products
routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)
routes.get('/products/:id', ProductController.show)

routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)

//! Alias
routes.get('/ads/create', function (req, res) {
	return res.redirect('/products/create')
})

module.exports = routes
