# Examples

Every snippet is a complete recipe. Copy it, then adjust the seed and CSS.

## Respect reduced motion (any framework)

Skip the grow animation for users who ask for less motion.

```ts
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

Then pass it as the `static` prop/input: `<Sprouts :static="still" />` (Vue), `<Sprouts static={still} />` (React), `[static]="still"` (Angular).

## One seed per item in a list

A stable id as the seed gives each card its own vines, identical on every visit.

```vue
<!-- Vue -->
<li v-for="post in posts" :key="post.id" class="card">
  <Sprouts :seed="post.id" variant="corners" :density="1" />
  {{ post.title }}
</li>
```

```tsx
// React
{posts.map((post) => (
  <li key={post.id} className="card">
    <Sprouts seed={post.id} variant="corners" density={1} />
    {post.title}
  </li>
))}
```

```html
<!-- Angular -->
@for (post of posts; track post.id) {
  <li class="card"><sprouts [seed]="post.id" variant="corners" [density]="1" />{{ post.title }}</li>
}
```

## Restart the animation when the seed changes in Vue

The Vue component reads its props while growing, but does not restart after it finishes. Force a fresh mount with `key`:

```vue
<Sprouts :key="seed" :seed="seed" />
```

## Render an SVG file from Node (core)

```ts
import { writeFile } from 'node:fs/promises'
import { renderSproutsSvg } from '@mariosakka/sprouts'

await writeFile('hero.svg', renderSproutsSvg({ seed: 'hero', width: 600, height: 300, variant: 'burst', density: 3 }))
```

## Scrub the growth yourself (core)

`progress` is just a number, so you can drive it from scroll, a slider or a test.

```ts
import { renderSproutsSvg } from '@mariosakka/sprouts'

const box = document.querySelector('#box')!
const slider = document.querySelector<HTMLInputElement>('#progress')!
slider.addEventListener('input', () => {
  box.innerHTML = renderSproutsSvg({ seed: 7, width: 320, height: 200, progress: Number(slider.value) })
})
```

## Several assets at once (renderer CLI)

`sprouts.config.json`:

```json
{
  "assets": [
    { "output": "public/sprouts/hero.webp", "format": "webp", "width": 800, "height": 400, "seed": "hero", "variant": "burst", "density": 3 },
    { "output": "public/sprouts/card.gif", "format": "gif", "width": 320, "height": 200, "seed": "card", "variant": "corners", "fps": 15 }
  ]
}
```

```sh
npx sprouts render --config sprouts.config.json
```

Use the resulting file as an ordinary `<img>`. The animation plays once and holds its last frame.
