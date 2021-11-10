const CryptoJS = require('crypto-js')

module.exports = {
	encryptAES(password) {
		// EMCRYPTION_KEY Must be 256 bits (32 characters) inside .env file
		const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
		const passwordEncrypted = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY)

		return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(passwordEncrypted))
	},

	decryptAES(encrypted) {
		// EMCRYPTION_KEY Must be 256 bits (32 characters) inside .env file
		const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
		const encryptionDecoded = CryptoJS.enc.Hex.parse(encrypted).toString(CryptoJS.enc.Utf8)

		return CryptoJS.AES.decrypt(encryptionDecoded, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
	},
}
