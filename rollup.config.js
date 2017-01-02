'use strict'

var buble = require('rollup-plugin-buble')

module.exports = {
  entry: 'index.js',
  useStrict: true,
  targets: [
    { dest: 'build/index.es6.js', format: 'es' },
    { dest: 'build/index.js', format: 'cjs' }
  ],
  plugins: [buble({ target: { node: '4' } })]
}
