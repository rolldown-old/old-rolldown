import extend from 'extend-shallow'
import loadPkg from 'load-pkg'

const arrayify = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

const loadPackage = () => new Promise((resolve, reject) => {
  loadPkg((err, pkg) => {
    if (err) return reject(err)
    resolve(pkg)
  })
})

const getDefaults = (options, pkg) => {
  options = extend({}, pkg.rollup, options)
  options = pkg.rollupConfig ? extend(options, pkg.rollupConfig) : options
  options = pkg.config.rollup ? extend(options, pkg.config.rollup) : options

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

  return options
}

export default {
  extend,
  arrayify,
  getDefaults,
  loadPackage
}
