# @mariosakka/sprouts-angular

Live Angular overlay that grows deterministic botanical SVG sprouts around its parent element. Decorative only (`aria-hidden`). Requires Angular 20 or newer (signal inputs, zoneless-friendly, SSR-safe).

```sh
npm install @mariosakka/sprouts-angular
```

```ts
import { Component } from '@angular/core'
import { SproutsComponent } from '@mariosakka/sprouts-angular'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SproutsComponent],
  template: `<div class="card" style="position: relative"><sprouts seed="about" variant="corners" [density]="2" />Content</div>`,
})
export class CardComponent {}
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

Part of [Sprouts](https://github.com/mariosakka/sprouts). MIT licensed. Geometry comes from [`@mariosakka/sprouts`](https://www.npmjs.com/package/@mariosakka/sprouts).
