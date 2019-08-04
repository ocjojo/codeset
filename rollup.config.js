import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
			{ file: pkg.browser, format: 'umd', name: 'codeset' },
		],
		plugins: [
			babel({
				exclude: ['node_modules/**'],
			}),
			production && terser(),
		],
	},
]
