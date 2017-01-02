import extend from 'extend-shallow'
import path from 'path'
import fs from 'fs'
import uuid from 'uuid'
import { tmpdir } from 'os'

const arrayify = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

const tempfile = (contents) => new Promise((resolve, reject) => {
  const tmpfile = path.join(tmpdir(), uuid.v4() + '.js')
  fs.writeFile(tmpfile, contents, (err) => {
    if (err) return reject(err)
    resolve(tmpfile)
  })
})

const loadPackage = () => new Promise((resolve, reject) => {
  const fp = path.join(process.cwd(), 'package.json')
  fs.readFile(fp, 'utf-8', (err, res) => {
    if (err) return reject(err)
    resolve(JSON.parse(res))
  })
})

const getDefaults = (options, pkg) => {
  options = extend({}, pkg.rollup, options)
  options = pkg.rollupConfig ? extend(options, pkg.rollupConfig) : options
  options = pkg.config.rollup ? extend(options, pkg.config.rollup) : options
  options.onwarn = typeof options.onwarn === 'function'
    ? options.onwarn
    : (er) => {}

  // smart resolving for plugins
  options.plugins = arrayify(options.plugins).map((plugin) => {
    if (typeof plugin === 'string') {
      return require('rollup-plugin-' + plugin)()
    }
    if (Array.isArray(plugin)) {
      const fn = typeof plugin[0] === 'function'
        ? plugin[0]
        : require('rollup-plugin-' + plugin[0])

      return fn(plugin[1])
    }
    return plugin
  })

  // plugin for `ongenerate` and `onwrite` hooks
  options.plugins.push({
    name: 'rolldown-hooks',
    onwrite: (opts) => (
      typeof options.onwrite === 'function' && options.onwrite(opts)
    ),
    ongenerate: (opts) => (
      typeof options.ongenerate === 'function' && options.ongenerate(opts)
    )
  })

  // prevent rollup from throwing
  // if unknown options is passed
  // such as `options.ongenerate`
  // and `options.onwrite`
  const opts = extend({}, options)
  delete opts['ongenerate']
  delete opts['onwrite']

  return opts
}

export default {
  extend,
  arrayify,
  getDefaults,
  loadPackage,
  tempfile
}
