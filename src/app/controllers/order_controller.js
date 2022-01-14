const LoadProductService = require('../services/load_product_service.js')
const User = require('../models/user.js')
const Order = require('../models/order.js')

const mailer = require('../../lib/mailer.js')
const Cart = require('../../lib/cart.js')
const { formatPrice, date } = require('../../lib/utils.js')

const email = (seller, product, buyer) => `
<h2>Olá, ${seller.name}</h2>
<p> Você tem um novo pedido de compra do seu produto.</p>
<p>Produto: ${product.name}</p>
<p>Preço: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador</h3>
<p>Nome: ${buyer.name}</p>
<p>Email: ${buyer.email}</p>
<p>Endereço: ${buyer.address}</p>
<p>Cep: ${buyer.cep}</p>
<p><br/><br/></p>
<p><strong>Entre em contato com o comprador, para finalizar a venda!</strong></p>
<p><br/><br/></p>
<p>Atenciosamente, Equipe Launchstore</p>
`

module.exports = {
	async index(req, res) {
		let orders = await Order.findAll({ where: { buyer_id: req.session.userId } })

		const getOrdersPromise = orders.map(async order => {
			order.product = await LoadProductService.load('products', {
				where: { id: order.product_id },
			})

			order.buyer = await User.findOne({ where: { id: order.buyer_id } })

			order.seller = await User.findOne({ where: { id: order.seller_id } })

			order.formattedPrice = formatPrice(order.price)
			order.formattedTotal = formatPrice(order.total)

			const statuses = {
				open: 'Aberto',
				sold: 'Vendido',
				canceled: 'Cancelado',
			}

			order.formattedStatus = statuses[order.status]

			const updatedAt = date(order.updated_at)
			order.formattedUpdatedAt =
				`${order.formattedStatus} em ${updatedAt.day}/${updatedAt.month}/${updatedAt.year} às ` +
				`${updatedAt.hour}`.padStart(2, '0') +
				`:${updatedAt.minutes}`.padStart(2, '0')

			return order
		})

		orders = await Promise.all(getOrdersPromise)

		return res.render('orders/index', { orders })
	},
	async post(req, res) {
		try {
			const cart = Cart.init(req.session.cart)

			const buyer_id = req.session.userId
			const filteredItems = cart.items.filter(item => item.product.user_id != buyer_id)

			const createOrdersPromise = filteredItems.map(async item => {
				let { product, price: total, quantity } = item
				const { price, id: product_id, user_id: seller_id } = product
				const status = 'open'

				const order = await Order.create({
					seller_id,
					buyer_id,
					product_id,
					price,
					total,
					quantity,
					status,
				})

				product = await LoadProductService.load('product', {
					where: { id: product_id },
				})
				const seller = await User.findOne({ where: { id: seller_id } })
				const buyer = await User.findOne({ where: { id: buyer_id } })

				await mailer.sendMail({
					to: seller.email,
					from: 'no-reply@launchstore.com.br',
					subject: 'Novo pedido de compra',
					html: email(seller, product, buyer),
				})

				return order
			})

			await Promise.all(createOrdersPromise)

			delete req.session.cart
			Cart.init()

			return res.render('orders/success')
		} catch (err) {
			console.error(err)
			return res.render('orders/error')
		}
	},
}
