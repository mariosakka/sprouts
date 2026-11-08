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

Place it inside a `position: relative` parent that has a size. The overlay ships no CSS, so offset it by the reach (default 56px) to let the vines grow around the parent:

```css
.sprouts { position: absolute; top: -56px; left: -56px; pointer-events: none; }
```

Use your own `reach` value in place of 56 if you set one. More recipes (reduced motion, one seed per list item) are in the [examples](https://github.com/mariosakka/sprouts/blob/main/docs/examples.md) and the [guide](https://github.com/mariosakka/sprouts/blob/main/docs/guide.md).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `seed` | `string \| number` | `1` | Same seed, same sprouts |
| `variant` | `'corners' \| 'edge' \| 'wrap' \| 'hang' \| 'climb' \| 'burst' \| 'auto'` | `'auto'` | `auto` picks one from the seed |
| `density` | `1 \| 2 \| 3` | `2` | Number of vines |
| `reach` | `number` | `56` | How far vines extend past the parent |
| `static` | `boolean` | `false` | Skip the grow animation and show the final frame |

## Examples

One seed per list item, so every card keeps its own look:

```tsx
{posts.map((post) => (
  <li key={post.id} className="card">
    <Sprouts seed={post.id} variant="corners" density={1} />
    {post.title}
  </li>
))}
```

Skip the animation for users who prefer reduced motion:

```tsx
import { Sprouts } from '@mariosakka/sprouts-react'

const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const Card = () => (
  <div className="card" style={{ position: 'relative' }}>
    <Sprouts seed="about" static={still} />
  </div>
)
```

Changing `seed`, `variant`, `density`, `reach` or `static` restarts the growth automatically:

```tsx
const [seed, setSeed] = useState(1)

<button onClick={() => setSeed((n) => n + 1)}>Regrow</button>
<Sprouts seed={seed} />
```

A wider reach for a hero section (remember the matching CSS offset):

```tsx
<Sprouts seed="hero" variant="burst" density={3} reach={120} />
```

```css
.hero .sprouts { position: absolute; top: -120px; left: -120px; pointer-events: none; }
```

Part of [Sprouts](https://github.com/mariosakka/sprouts). MIT licensed. Geometry comes from [`@mariosakka/sprouts`](https://www.npmjs.com/package/@mariosakka/sprouts).
