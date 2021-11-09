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
	formatCpfCnpj(value) {
		// permit only numbers
		value = value.replace(/\D/g, '')

		// limit total numbers
		if (value.length > 14) {
			value = value.slice(0, -1)
		}

		// check if is cpf or cnpj by length | cnpj = 11.222.333/0001-11
		if (value.length > 11) {
			// cnpj
			value = value.replace(/(\d{2})(\d)/, '$1.$2')
			// value = 11.222333444455

			value = value.replace(/(\d{3})(\d)/, '$1.$2')
			// value = 11.222.333444455

			value = value.replace(/(\d{3})(\d)/, '$1/$2')
			// value = 11.222.333/444455

			value = value.replace(/(\d{4})(\d)/, '$1-$2')
			// value = 11.222.333/4444-55
		} else {
			// cpf
			value = value.replace(/(\d{3})(\d)/, '$1.$2')
			value = value.replace(/(\d{3})(\d)/, '$1.$2')
			value = value.replace(/(\d{3})(\d)/, '$1-$2')
		}

		return value
	},
	formatCep(value) {
		value = value.replace(/\D/g, '')

		// limit total numbers
		if (value.length > 8) {
			value = value.slice(0, -1)
		}

		value = value.replace(/(\d{5})(\d)/, '$1-$2')

		return value
	},
}
