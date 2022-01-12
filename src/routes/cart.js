const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/cart_controller.js')

//! Login / Logout
routes.get('/', CartController.index)

module.exports = routes
