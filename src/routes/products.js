const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer.js')

const ProductController = require('../app/controllers/product_controller.js')
const SearchController = require('../app/controllers/search_controller.js')

const { onlyUsers } = require('../app/middlewares/session.js')

//! Search
routes.get('/search', SearchController.index)

//! Products
routes.get('/create', onlyUsers, ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', onlyUsers, ProductController.edit)

routes.post('/', onlyUsers, multer.array('photos', 6), ProductController.post)
routes.put('/', onlyUsers, multer.array('photos', 6), ProductController.put)
routes.delete('/', onlyUsers, ProductController.delete)

module.exports = routes
