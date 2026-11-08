import { expect, test } from 'vitest'
import { layoutSprouts, renderSproutsSvg } from './index.js'
test('layout is deterministic', () => expect(layoutSprouts({ seed: 'card', width: 400, height: 200 })).toEqual(layoutSprouts({ seed: 'card', width: 400, height: 200 })))
test('frame progresses vines', () => { const a = renderSproutsSvg({ seed: 1, width: 200, height: 100, progress: 0 }); const b = renderSproutsSvg({ seed: 1, width: 200, height: 100, progress: 1 }); expect(a).not.toEqual(b) })
