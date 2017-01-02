import test from 'mukla'
import rolldown from './index'

test('rolldown', () => {
  return rolldown().catch(() => {
    return true
  })
})
