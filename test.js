/*!
 * rolldown <https://github.com/tunnckoCore/rolldown>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const rolldown = require('./build')

test('rolldown', () => {
  return rolldown().catch(() => {
    return true
  })
})
