import test from 'mukla'
import rolldown from './index'
import path from 'path'

test('rolldown', () => {
  const entry = path.resolve(__dirname, '..', 'src', 'index.js')
  return rolldown({
    entry: entry,
    ongenerate: (opts) => {
      console.log('on generate')
    }
    // dest: 'foo.js'
  }).then((result) => {
    console.log('done')
  })
})
