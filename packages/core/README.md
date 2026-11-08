# @mariosakka/sprouts

Deterministic botanical SVG art. The same `seed` always produces the same vines, so output is stable across renders, frameworks and builds. Framework-free core used by the Vue, React, Angular and renderer packages.

```sh
npm install @mariosakka/sprouts
```

```ts
import { layoutSprouts, renderSproutsSvg } from '@mariosakka/sprouts'

// SVG string for one frame; progress 0..1 is how far the growth has played
const svg = renderSproutsSvg({ seed: 'hello', width: 320, height: 200, progress: 1 })

// Just the geometry and timings
const layout = layoutSprouts({ seed: 'hello', width: 320, height: 200 })
```

## Options

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `seed` | `string \| number` | required | Same seed, same output |
| `width`, `height` | `number` | required | Size of the box the sprouts surround |
| `variant` | `'corners' \| 'edge' \| 'wrap' \| 'hang' \| 'climb' \| 'burst' \| 'auto'` | `'auto'` | `auto` picks one from the seed |
| `density` | `1 \| 2 \| 3` | `2` | Number of vines |
| `reach` | `number` | `56` | How far vines extend past the box (min 12) |
| `progress` | `number` | `1` | Frame position, 0 to 1 (`renderSproutsSvg` only) |

The SVG is sized `width + 2 * reach` by `height + 2 * reach`, so position it offset by `-reach`. `SPROUT_VARIANTS` lists the variants.

Part of [Sprouts](https://github.com/mariosakka/sprouts). MIT licensed. For framework components see `-vue`, `-react` and `-angular`; for GIF/WebP files see `-renderer`.

More recipes: [guide](https://github.com/mariosakka/sprouts/blob/main/docs/guide.md) and [examples](https://github.com/mariosakka/sprouts/blob/main/docs/examples.md).
