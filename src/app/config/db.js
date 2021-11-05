const { Pool, Client } = require('pg')

if (process.env.APP_ENV === 'development') {
	const dbLocal = new Pool({
		user: 'postgres',
		password: 'postgres',
		host: 'localhost',
		port: 5432,
		database: 'launchstore',
	})

	console.log('Connected to Local Database!')
	module.exports = dbLocal
} else {
	const dbHeroku = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
		idle_in_transaction_session_timeout: 600000,
	})

	dbHeroku
		.connect()
		.then(() => console.log('Connected to Heroku Database!'))
		.catch(err => console.error(red('Heroku Database Connection Error:', err)))

	module.exports = dbHeroku
}
