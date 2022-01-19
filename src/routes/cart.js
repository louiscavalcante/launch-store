const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/cart_controller.js')

//! Login / Logout
routes.get('/', CartController.index)
routes.post('/:id/add-one', CartController.addOne)
routes.post('/:id/remove-one', CartController.removeOne)
routes.post('/:id/delete', CartController.delete)

module.exports = routes
