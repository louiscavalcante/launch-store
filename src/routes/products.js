const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer.js')

const ProductController = require('../app/controllers/product_controller.js')
const SearchController = require('../app/controllers/search_controller.js')

//! Search
routes.get('/search', SearchController.index)

//! Products
routes.get('/create', ProductController.create)
routes.get('/:id/edit', ProductController.edit)
routes.get('/:id', ProductController.show)

routes.post('/', multer.array('photos', 6), ProductController.post)
routes.put('/', multer.array('photos', 6), ProductController.put)
routes.delete('/', ProductController.delete)

module.exports = routes
