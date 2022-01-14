const express = require('express')
const routes = express.Router()

const OrderController = require('../app/controllers/order_controller.js')

const { onlyUsers } = require('../app/middlewares/session.js')

routes.post('/', onlyUsers, OrderController.post)
routes.get('/', onlyUsers, OrderController.index)

module.exports = routes
