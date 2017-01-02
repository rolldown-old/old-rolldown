'use strict'

import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  banner: `/*!
 * rolldown <https://github.com/rolldown/rolldown>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */
`,
  targets: [
    { dest: 'lib/index.es6.js', format: 'es' },
    { dest: 'lib/index.js', format: 'cjs' }
  ],
  onwarn: () => {},
  plugins: [buble({ target: { node: '4' } })]
}
