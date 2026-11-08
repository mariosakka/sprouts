import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

const read = (path: string) => readFileSync(resolve(import.meta.dirname, '..', path), 'utf8')

test('README documents every published package and supported live adapter', () => {
  const readme = read('README.md')
  for (const name of ['@mariosakka/sprouts', '@mariosakka/sprouts-vue', '@mariosakka/sprouts-react', '@mariosakka/sprouts-angular', '@mariosakka/sprouts-renderer']) {
    expect(readme).toContain(`\`${name}\``)
  }
  for (const framework of ['Vue', 'React', 'Angular']) expect(readme).toContain(framework)
})

test('current test strategy and release status are documented', () => {
  expect(read('docs/testing.md')).toContain('type checks, linting, unit tests, and builds')
  expect(read('docs/roadmap.md')).toContain('first npm publish')
})
