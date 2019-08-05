export const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

export const invisible = []
for (let i = 0; i < 1024; i++) {
	invisible.push(String.fromCodePoint(0xe01f0 + i))
}

export const base64 = [
	...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
]

let encoder
function getEncoder() {
	if (!encoder) {
		encoder = new TextEncoder()
	}
	return encoder
}
function toBinary(data) {
	if (typeof data === 'string') {
		return Array.from(getEncoder().encode(data)).reduce((binary, b) => {
			const binaryChar = b.toString(2)
			return binary + '00000000'.slice(binaryChar.length) + binaryChar
		}, '')
	}
}

let decoder
function getDecoder() {
	if (!decoder) {
		decoder = new TextDecoder()
	}
	return decoder
}
function fromBinary(binary) {
	return getDecoder().decode(new Uint8Array(binary))
}

function chunkSizeFromNumberOfChars(n) {
	return 31 - Math.clz32(n)
}

export class codeset {
	constructor({ alphabet }) {
		if (alphabet.length < 1) {
			throw new Error('Provide an alphabet with at least two characters.')
		}
		this.chunkSize = chunkSizeFromNumberOfChars(alphabet.length)
		this.alphabet = alphabet
	}

	encode(data) {
		const { chunkSize, alphabet } = this
		let binary = toBinary(data)
		while (binary.length % chunkSize > 0) {
			binary += '00000000'
		}

		let encoded = ''
		for (let i = 0; i < binary.length; i += chunkSize) {
			const index = parseInt(binary.slice(i, i + chunkSize), 2)
			encoded += alphabet[index]
		}

		return encoded
	}

	decode(data) {
		const { alphabet, chunkSize } = this
		const pad = (1 << (chunkSize - 1)).toString(2).replace('1', '0')
		const binaryString = Array.from(data).reduce((binary, char) => {
			const index = alphabet.indexOf(char)
			if (index < 0) return binary
			const bin = index.toString(2)
			return binary + pad.slice(bin.length) + bin
		}, '')

		const binary = []
		for (let i = 0; i < binaryString.length; i += 8) {
			const bin = parseInt(binaryString.slice(i, i + 8), 2)
			binary.push(bin)
		}
		return fromBinary(binary)
	}
}
