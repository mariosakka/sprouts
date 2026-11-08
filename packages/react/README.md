# @mariosakka/sprouts-react

Live React overlay that grows deterministic botanical SVG sprouts around its parent element. Decorative only (`aria-hidden`). Requires React 18 or 19.

```sh
npm install @mariosakka/sprouts-react
```

```tsx
import { Sprouts } from '@mariosakka/sprouts-react'

export const Card = () => (
  <div className="card" style={{ position: 'relative' }}>
    <Sprouts seed="about" variant="corners" density={2} />
    Content
  </div>
)
```

Place it inside a positioned parent: it sizes itself to the parent and draws the vines in the margin around it.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `seed` | `string \| number` | `1` | Same seed, same sprouts |
| `variant` | `'corners' \| 'edge' \| 'wrap' \| 'hang' \| 'climb' \| 'burst' \| 'auto'` | `'auto'` | `auto` picks one from the seed |
| `density` | `1 \| 2 \| 3` | `2` | Number of vines |
| `reach` | `number` | `56` | How far vines extend past the parent |
| `static` | `boolean` | `false` | Skip the grow animation and show the final frame |

Part of [Sprouts](https://github.com/mariosakka/sprouts). MIT licensed. Geometry comes from [`@mariosakka/sprouts`](https://www.npmjs.com/package/@mariosakka/sprouts).
