#!/usr/bin/env node
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { renderAnimation } from './index.js'
const i = process.argv.indexOf('--config'); const file = i < 0 ? 'sprouts.config.json' : process.argv[i + 1]
if (!file) throw new Error('Usage: sprouts render --config sprouts.config.json')
const config = JSON.parse(await readFile(file, 'utf8'))
if (!Array.isArray(config.assets) || !config.assets.length) throw new Error('config.assets must be a non-empty array')
for (const asset of config.assets) { if (!asset.output || !['gif', 'webp'].includes(asset.format) || !asset.width || !asset.height) throw new Error('Each asset needs output, format, width and height'); const out = await renderAnimation(asset); await mkdir(dirname(asset.output), { recursive: true }); await writeFile(asset.output, out) }
