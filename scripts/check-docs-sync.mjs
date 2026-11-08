import { execFileSync } from 'node:child_process'

const base = process.argv[2]
if (!base || /^0+$/.test(base)) process.exit(0)

let changed
try {
  changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean)
} catch {
  process.exit(0)
}

const implementationChanged = changed.some((path) => /^packages\/[^/]+\/(src\/|package\.json$)/.test(path) && !/\.test\.(ts|tsx)$/.test(path))
const docsChanged = changed.some((path) => path === 'README.md' || path.startsWith('docs/'))
if (implementationChanged && !docsChanged) {
  console.error('Package implementation changed without updating README.md or docs/. Add documentation or use a separate docs commit.')
  process.exit(1)
}
