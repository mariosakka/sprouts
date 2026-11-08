import { readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const version = process.argv[2]
if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error('Usage: npm run release:version -- <semver>')
}

const manifests = ['package.json', 'packages/core/package.json', 'packages/vue/package.json', 'packages/react/package.json', 'packages/angular/package.json', 'packages/renderer/package.json']
for (const relative of manifests) {
  const path = resolve(relative)
  const manifest = JSON.parse(await readFile(path, 'utf8'))
  manifest.version = version
  await writeFile(path, `${JSON.stringify(manifest, null, 2)}\n`)
}

execFileSync('npm', ['install', '--package-lock-only', '--ignore-scripts'], { stdio: 'inherit' })
