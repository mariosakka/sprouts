import { readFile } from 'node:fs/promises'

const tag = process.argv[2]
if (!tag?.startsWith('v')) throw new Error('Release tag must be v<semver>.')
const expected = tag.slice(1)
const manifests = ['package.json', 'packages/core/package.json', 'packages/vue/package.json', 'packages/react/package.json', 'packages/angular/package.json', 'packages/renderer/package.json']
for (const path of manifests) {
  const { version } = JSON.parse(await readFile(path, 'utf8'))
  if (version !== expected) throw new Error(`${path} is ${version}; expected ${expected}.`)
}
