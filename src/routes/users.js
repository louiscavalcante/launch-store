const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/session_controller.js')
const UserController = require('../app/controllers/user_controller.js')

const UserValidator = require('../app/validators/user.js')
const SessionValidator = require('../app/validators/session.js')
const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session.js')

//! Login / Logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

//! Reset Password / Forgot Password
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

//! User register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

module.exports = routes
