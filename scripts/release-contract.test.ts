import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

const readVersion = (path: string) => JSON.parse(readFileSync(resolve(import.meta.dirname, '..', path), 'utf8')).version as string
const manifests = ['package.json', 'packages/core/package.json', 'packages/vue/package.json', 'packages/react/package.json', 'packages/angular/package.json', 'packages/renderer/package.json']

test('workspace and all publishable packages share one release version', () => {
  const version = readVersion('package.json')
  for (const path of manifests) expect(readVersion(path)).toBe(version)
})
