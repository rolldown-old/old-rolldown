/*!
 * rolldown <https://github.com/tunnckoCore/rolldown>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

import test from 'mukla'
import rolldown from './index'

test('rolldown', () => {
  return rolldown().catch(() => {
    return true
  })
})
