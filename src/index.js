import r from 'rollup'
import utils from './utils'

const rolldown = (options) => utils.loadPackage().then((pkg) => {
  options = utils.getDefaults(options, pkg)

  return r.rollup(options).then((bundle) => {
    if (options.dest) {
      options.onwrite(options)
      return bundle.write(options)
    }

    if (options.targets) {
      return Promise.all(options.targets.map((target) => {
        const opts = utils.extend({}, options, target)
        options.onwrite(opts)
        return bundle.write(opts)
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
})

export default rolldown
