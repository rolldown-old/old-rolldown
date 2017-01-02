'use strict'

import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/test.js',
  dest: 'tmp/test.js',
  format: 'cjs',
  plugins: [buble({ target: { node: '4' } })]
}
