const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/home_controller.js')

const products = require('./products.js')
const users = require('./users.js')
const cart = require('./cart.js')
const orders = require('./orders.js')

//! Home
routes.get('/', HomeController.index)

routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)
routes.use('/orders', orders)

//! Alias
routes.get('/ads/create', function (req, res) {
	return res.redirect('/products/create')
})

routes.get('/accounts', function (req, res) {
	return res.redirect('/users/login')
})

module.exports = routes
