import test from 'mukla'
import rolldown from './index'

test('rolldown', (done) => {
  let called = 0
  rolldown({
    source: `export default (foo) => Promise.resolve(foo)`,
    ongenerate: (opts) => {
      test.strictEqual(typeof opts, 'object')
      test.strictEqual(typeof opts.bundle, 'object')
      called++
    },
    format: 'cjs',
    plugins: [['buble', { target: { node: '0.12' } }]]
  }).then((result) => {
    test.strictEqual(/function/.test(result.code), true)
    test.strictEqual(/module/.test(result.code), true)
    test.strictEqual(/exports/.test(result.code), true)
    test.strictEqual(called, 1)
    done()
  }, done).catch(done)
})
