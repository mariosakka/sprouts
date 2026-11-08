# Sprouts

Deterministic botanical SVG art for live Vue interfaces or pre-rendered GIF/WebP assets.

## Packages

- `@mariosakka/sprouts`: seed-based layout and SVG frame rendering.
- `@mariosakka/sprouts-vue`: live Vue 3 overlay.
- `@mariosakka/sprouts-renderer`: Node rendering API and `sprouts render` CLI.

Run `npm run check` to validate the workspace. Run `npm run prepare` after cloning to install the local hook. Publication uses GitHub trusted publishing after npm is configured for this repository.

## Compiled assets

Create `sprouts.config.json` with an `assets` array. Every asset needs `output`, `format` (`gif` or `webp`), `width`, `height`, and `seed`; it can also set `variant`, `density`, `reach`, and `fps`. Run `npx sprouts render --config sprouts.config.json`.
