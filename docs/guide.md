# Sprouts guide

Sprouts draws decorative vines that grow around a box. Everything is derived from a `seed`, so the same inputs always produce the same picture. That makes it safe for server rendering, snapshot tests and pre-rendered assets.

## Which package do I need?

| I want to... | Install |
| --- | --- |
| Animate sprouts around an element in Vue 3 | `@mariosakka/sprouts-vue` |
| ...in React 18 or 19 | `@mariosakka/sprouts-react` |
| ...in Angular 20 or newer | `@mariosakka/sprouts-angular` |
| Get the SVG string and draw it myself | `@mariosakka/sprouts` |
| Ship a GIF or WebP file instead of live SVG | `@mariosakka/sprouts-renderer` |

The framework packages depend on the core, so you never install both.

## Concepts

- **Seed**: any string or number. Use something stable per card or page (an id, a slug) so each one gets its own look that never changes between visits.
- **Variant**: where the vines grow from. `corners`, `edge`, `wrap`, `hang`, `climb`, `burst`, or `auto` (default), which picks one from the seed.
- **Density**: `1`, `2` or `3`, giving 3, 6 or 10 vines.
- **Reach**: how far, in pixels, vines extend past the box (default 56, minimum 12). The SVG is `width + 2 * reach` by `height + 2 * reach`, with its origin at `-reach`.
- **Progress**: 0 to 1, how much of the growth has played. The live components animate it over 2.8 seconds and stop at 1.

## Placing the overlay (Vue, React, Angular)

The components measure their parent and render an SVG that is bigger than it by `reach` on every side. They ship no CSS, so position the overlay yourself inside a `position: relative` parent:

```css
.sprouts {
  position: absolute;
  top: -56px;  /* minus your reach */
  left: -56px;
  pointer-events: none;
}
```

The parent needs a real size (set a width and height, or let content define it). If a component renders at the 320 by 200 fallback, the parent had no measurable size at mount time.

## Accessibility and motion

The overlay is `aria-hidden` and decorative. The components do not read `prefers-reduced-motion` for you; pass `static` when the user prefers reduced motion (see [examples](examples.md)).

## Limits

See [known issues](known-issues.md).
