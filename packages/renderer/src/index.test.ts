import { expect, test } from 'vitest'
import sharp from 'sharp'
import { renderAnimation } from './index.js'
test('renders an animated WebP', async () => { const bytes = await renderAnimation({ seed: 1, width: 80, height: 40, format: 'webp', fps: 2 }); const meta = await sharp(bytes, { animated: true }).metadata(); expect(meta.pages).toBeGreaterThan(1); expect(meta.width).toBe(192) })
