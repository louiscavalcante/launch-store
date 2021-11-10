const CryptoJS = require('crypto-js')

module.exports = {
	encrypt(password, key) {
		// Parameter (key) Must be 256 bits (32 characters) inside .env file
		const passwordEncrypted = CryptoJS.AES.encrypt(password, key)

		return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(passwordEncrypted))
	},

	decrypt(encrypted, key) {
		const encryptionDecoded = CryptoJS.enc.Hex.parse(encrypted).toString(CryptoJS.enc.Utf8)

		return CryptoJS.AES.decrypt(encryptionDecoded, key).toString(CryptoJS.enc.Utf8)
	},
}
