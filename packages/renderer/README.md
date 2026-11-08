# @mariosakka/sprouts-renderer

Pre-render [Sprouts](https://github.com/mariosakka/sprouts) animations to transparent GIF or WebP files, from Node or the `sprouts render` CLI. The animation grows once and holds its final frame. Uses [sharp](https://sharp.pixelplumbing.com/).

```sh
npm install --save-dev @mariosakka/sprouts-renderer
```

## CLI

Create `sprouts.config.json`:

```json
{
  "assets": [
    { "output": "public/sprouts/hero.webp", "format": "webp", "width": 600, "height": 300, "seed": "hero", "variant": "corners", "density": 2 }
  ]
}
```

```sh
npx sprouts render --config sprouts.config.json
```

Each asset needs `output`, `format` (`gif` or `webp`), `width`, `height` and `seed`; optional `variant`, `density`, `reach` and `fps` (default 20). `--config` defaults to `sprouts.config.json`.

## API

```ts
import { writeFile } from 'node:fs/promises'
import { renderAnimation } from '@mariosakka/sprouts-renderer'

const buffer = await renderAnimation({ format: 'gif', seed: 'hero', width: 600, height: 300 })
await writeFile('hero.gif', buffer)
```

`renderAnimation` accepts the core options plus `format`, `fps` and `holdMs` (final-frame hold, default 350 ms) and resolves to a `Buffer`. Output is `width + 2 * reach` by `height + 2 * reach` pixels.

## Examples

Render several assets with one command (`sprouts.config.json`):

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

Run it before your site build so the files exist when it bundles:

```json
{ "scripts": { "prebuild": "sprouts render --config sprouts.config.json" } }
```

Use the result as an ordinary image. The animation plays once and holds its last frame:

```html
<div class="hero"><img src="/sprouts/hero.webp" alt="" /></div>
```

Generate assets from code, one per page:

```ts
import { writeFile } from 'node:fs/promises'
import { renderAnimation } from '@mariosakka/sprouts-renderer'

for (const slug of ['about', 'work', 'contact']) {
  await writeFile(`public/sprouts/${slug}.webp`, await renderAnimation({ format: 'webp', seed: slug, width: 400, height: 240, variant: 'edge' }))
}
```

Part of [Sprouts](https://github.com/mariosakka/sprouts). MIT licensed.

More recipes: [guide](https://github.com/mariosakka/sprouts/blob/main/docs/guide.md) and [examples](https://github.com/mariosakka/sprouts/blob/main/docs/examples.md).
