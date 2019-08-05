const { codeset, alphabet } = require('..')
const { equal } = require('assert').strict

const coder = new codeset({ alphabet })

const encoded = coder.encode('Hello World')
const decoded = coder.decode(encoded)
equal(decoded, 'Hello World')
