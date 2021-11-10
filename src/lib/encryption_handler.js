const crypto = require('crypto')
const SECRET = process.env.SECRET || 'Ov2dLfd4YaHyg6uCychmdC8vtqBgD5Fs' // Must be 256 bits (32 characters)
const iv = 16 // FOR AES encryption, this is always 16

const encrypt = password => {
	const iv = Buffer.from(crypto.randomBytes(16))
	const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(SECRET), iv)

	const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()])
	
	return iv.toString('hex') + ':' + encryptedPassword.toString('hex')
}

const decrypt = encryption => {
	const encryptionParts = encryption.split(':')
	const iv = Buffer.from(encryptionParts.shift(), 'hex')
	const encryptedPassword = Buffer.from(encryptionParts.join(':'), 'hex')
	const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(SECRET), iv)
	let decryptedPassword = decipher.update(encryptedPassword)

	decryptedPassword = Buffer.concat([decryptedPassword, decipher.final()])

	return decryptedPassword.toString()
}

module.exports = { encrypt, decrypt }
