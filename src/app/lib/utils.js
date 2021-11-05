module.exports = {
	date(timestamp) {
		const date = new Date(timestamp)

		const year = date.getUTCFullYear()
		// Months goes from 0 to 11, so you need to add 1
		const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
		const day = `0${date.getUTCDate()}`.slice(-2)

		// iso: Needs to return YYYY-MM-DD
		return {
			day,
			month,
			year,
			iso: `${year}-${month}-${day}`,
			birthDay: `${day}/${month}`,
			format: `${day}/${month}/${year}`,
		}
	},
}
