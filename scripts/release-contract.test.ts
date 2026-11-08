import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

const readVersion = (path: string) => JSON.parse(readFileSync(resolve(import.meta.dirname, '..', path), 'utf8')).version as string
const manifests = ['package.json', 'packages/core/package.json', 'packages/vue/package.json', 'packages/react/package.json', 'packages/angular/package.json', 'packages/renderer/package.json']

test('workspace and all publishable packages share one release version', () => {
  const version = readVersion('package.json')
  for (const path of manifests) expect(readVersion(path)).toBe(version)
})

test('publishing is retry-safe and Release Please uses unprefixed v tags', () => {
  const publishScript = readFileSync(resolve(import.meta.dirname, '..', 'scripts/publish-workspace.mjs'), 'utf8')
  const config = readFileSync(resolve(import.meta.dirname, '..', 'release-please-config.json'), 'utf8')
  expect(publishScript).toContain('already exists; skipping')
  expect(config).toContain('"include-component-in-tag": false')
})
