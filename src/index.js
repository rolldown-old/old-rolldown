import r from 'rollup'
import utils from './utils'

const rollup = (options) => r.rollup(options).then((bundle) => {
  if (options.dest) {
    return bundle.write(options)
  }

  if (options.targets) {
    return Promise.all(options.targets.map((target) => {
      return bundle.write(utils.extend({}, options, target))
    }))
  }

  const result = bundle.generate(options)

  if (options.sourceMap === 'inline') {
    // seen in `rollup`s CLI
    // seems like some hack?
    let SOURCEMAPPING_URL = 'sourceMa'
    SOURCEMAPPING_URL += 'ppingURL'

    result.code += `\n//# ${SOURCEMAPPING_URL}=${result.map.toUrl()}\n`
  }

  return result
})

const rolldown = (options) => utils.loadPackage().then((pkg) => {
  options = utils.getDefaults(options, pkg)

  if (typeof options.source === 'string' && !options.entry) {
    return utils.tmpFile(options.source).then((file) => {
      options.entry = file.path
      delete options['source']

      return rollup(options)
    })
  }
  return rollup(options)
})

export default rolldown
