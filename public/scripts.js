//! -------------------- masks 
const Mask = {
	apply(input, func) {
		setTimeout(function () {
			input.value = Mask[func](input.value)
		}, 1)
	},
	formatBRL(value) {
		value = value.replace(/\D/g, '')

		return (value = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(value / 100))
	},
}
// O Mask é executado no FrontEnd como:
// onkeydown="Mask.apply(this, 'formatBRL')"
// this -> referencia o valor do input que será formatado pelo Mask

//! -------------------- delete confirmation
const formDelete = document.querySelector('#form-delete')

if (formDelete) {
	formDelete.addEventListener('click', function (event) {
		const confirmation = confirm('Do you really want to delete?')
		if (!confirmation) {
			event.preventDefault()
		}
	})
}
