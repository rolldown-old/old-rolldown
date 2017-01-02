import test from 'mukla'
import rolldown from './index'

test('rolldown', (done) => {
  rolldown({
    source: `export default (foo) => Promise.resolve(foo)`,
    ongenerate: (opts) => {
      // console.log('on generate')
    },
    format: 'cjs',
    plugins: [['buble', { target: { node: '0.12' } }]]
  }).then((result) => {
    test.strictEqual(/function/.test(result.code), true)
    test.strictEqual(/module/.test(result.code), true)
    test.strictEqual(/exports/.test(result.code), true)
    done()
  }, done).catch(done)
})
