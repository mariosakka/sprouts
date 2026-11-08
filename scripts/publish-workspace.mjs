import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'

const workspaces = {
  '@mariosakka/sprouts': 'packages/core/package.json',
  '@mariosakka/sprouts-vue': 'packages/vue/package.json',
  '@mariosakka/sprouts-react': 'packages/react/package.json',
  '@mariosakka/sprouts-angular': 'packages/angular/package.json',
  '@mariosakka/sprouts-renderer': 'packages/renderer/package.json'
}

const packageName = process.argv[2]
const manifestPath = workspaces[packageName]
if (!manifestPath) throw new Error(`Unknown publishable workspace: ${packageName ?? '(missing)'}`)

const { version } = JSON.parse(await readFile(manifestPath, 'utf8'))
const registry = `https://registry.npmjs.org/${encodeURIComponent(packageName)}/${version}`
const response = await fetch(registry)

if (response.ok) {
  console.log(`${packageName}@${version} already exists; skipping.`)
  process.exit(0)
}
if (response.status !== 404) throw new Error(`Could not check ${packageName}@${version}: ${response.status} ${response.statusText}`)

const result = spawnSync('npm', ['publish', '--workspace', packageName, '--access', 'public'], { stdio: 'inherit', shell: process.platform === 'win32' })
if (result.status !== 0) process.exit(result.status ?? 1)
