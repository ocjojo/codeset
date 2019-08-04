export const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

let encoder
function getEncoder() {
	if (!encoder) {
		encoder = new TextEncoder()
		encoder.encode
	}
	return encoder
}
function toBinary(data) {
	if (typeof data === 'string') {
		return Array.from(getEncoder().encode(data))
	}
}

function chunkSizeFromNumberOfChars(n) {
	return 31 - Math.clz32(n)
}

function encodeChar(byte, carry) {
	return {
		char,
		carry,
	}
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

		const binary = toBinary(data)
		console.log(binary)
		console.log(Array.from(binary).map(b => b.toString(2)))
		let encoded = ''

		let charIndex = 0
		let bitToIndex = chunkSize

		console.log(alphabet)
		for (let i = 0; i < binary.length; i++) {
			// shift binary data onto charIndex until less than 8 bit are needed
			if (bitToIndex > 7) {
				charIndex = (charIndex << 8) | binary[i]
				bitToIndex -= 8
				continue
			}

			let shift = 0
			if (bitToIndex > 0) {
				// shift rest onto charIndex
				shift = 8 - bitToIndex
				charIndex = (charIndex << bitToIndex) | (binary[i] >> shift)
			}
			// add encoded char
			encoded += alphabet[charIndex]

			// reset bitToIndex minus carried bits
			bitToIndex = chunkSize - shift

			// init charIndex to carried bits (= 8 - shift)
			charIndex = binary[i] >> (8 - shift)

			// carried charIndex is already complete
			if (charIndex && bitToIndex === 0) {
				i--
			}
		}

		// const encoded
		return encoded
	}

	decode(data) {
		return data
	}
}
