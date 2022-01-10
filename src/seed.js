const User = require('../src/app/models/user.js')
const Product = require('../src/app/models/product.js')
const File = require('../src/app/models/file.js')
const faker = require('faker')
const { encryptAES } = require('../src/lib/encryption_handler.js')

let usersIds = []
let totalProducts = 10
let totalUsers = 4

async function createUsers() {
	const users = []
	const password = await encryptAES('123')

	while (users.length < totalUsers) {
		users.push({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password,
			cpf_cnpj: faker.datatype.number({ min: 00000000000, max: 99999999999 }),
			cep: faker.datatype.number({ min: 00000000, max: 99999999 }),
			address: faker.address.streetName(),
		})
	}

	const usersPromise = users.map(user => User.create(user))
	usersIds = await Promise.all(usersPromise)
}

async function createProducts() {
	let products = []

	while (products.length < totalProducts) {
		products.push({
			category_id: Math.ceil(Math.random() * 3),
			user_id: usersIds[Math.floor(Math.random() * totalUsers)],
			name: faker.name.title(),
			description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
			old_price: faker.datatype.number({ min: 1, max: 100 }),
			price: faker.datatype.number({ min: 1, max: 100 }),
			quantity: faker.datatype.number({ min: 1, max: 100 }),
			status: Math.round(Math.random()),
		})
	}

	const productsPromise = products.map(product => Product.create(product))
	productsIds = await Promise.all(productsPromise)

	let files = []

	while (files.length < 10) {
		files.push({
			name: faker.image.image(),
			path: `public/images/placeholder.png`,
			product_id: productsIds[Math.floor(Math.random() * totalProducts)],
		})
	}

	const filesPromise = files.map(file => File.create(file))
	await Promise.all(filesPromise)
}

async function init() {
	await createUsers()
	await createProducts()
}

init()
