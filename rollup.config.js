'use strict'

import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  targets: [
    { dest: 'lib/index.es6.js', format: 'es' },
    { dest: 'lib/index.js', format: 'cjs' }
  ],
  plugins: [buble({ target: { node: '4' } })]
}
