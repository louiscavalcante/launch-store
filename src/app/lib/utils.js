module.exports = {
	date(timestamp) {
		const date = new Date(timestamp)

		//! Only for this App -> Format doesn't need UTC on getUTCFullYear() or getUTCMonth() or anything like that
		//! Because it's already being formated correctly inside the Database
		const year = date.getFullYear()
		// Months goes from 0 to 11, so you need to add 1
		const month = `${date.getMonth() + 1}`.padStart(2, '0')
		const day = `0${date.getDate()}`.slice(-2)
		const hour = date.getHours()
		const minutes = date.getMinutes()

		// iso: Needs to return YYYY-MM-DD
		return {
			day,
			month,
			year,
			hour,
			minutes,
			iso: `${year}-${month}-${day}`,
			birthDay: `${day}/${month}`,
			format: `${day}/${month}/${year}`,
		}
	},
	formatPrice(price) {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price / 100)
	},
}
