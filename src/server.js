const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('./config/session.js')
require('dotenv').config()

const server = express()
const PORT = process.env.PORT || 5000

server.use(session)
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'html')

nunjucks.configure('src/app/views', {
	express: server,
	autoescape: false, // Renders HTML inside variables
	noCache: true,
})

server.listen(PORT, function () {
	console.log(`Server is running...`)
})
