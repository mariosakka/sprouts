# Sprouts

Deterministic botanical SVG art for live Vue, React, and Angular interfaces, or pre-rendered GIF/WebP assets.

## Packages

- `@mariosakka/sprouts`: seed-based layout and SVG frame rendering.
- `@mariosakka/sprouts-vue`: live Vue 3 overlay.
- `@mariosakka/sprouts-react`: live React overlay for React 18 and 19.
- `@mariosakka/sprouts-angular`: standalone Angular component for Angular 17 through 19.
- `@mariosakka/sprouts-renderer`: Node rendering API and `sprouts render` CLI.

All five packages are published at `0.1.0`. Run `npm run check` to validate the workspace and `npm run prepare` after cloning to install the local hook.

## Releases

Packages share one version. For the next release, run `npm run release:version -- 0.1.1`, review the manifest and lockfile changes, run `npm run check`, and merge the release commit. Create a GitHub release tagged `v0.1.1`; the trusted-publishing workflow verifies that tag against every package manifest before publishing the five packages in dependency order.

## Live adapters

Each framework adapter exports a decorative `Sprouts` overlay driven by the core's seeded SVG renderer. Vue exposes `Sprouts`, React exports the `Sprouts` component, and Angular exports the standalone `SproutsComponent` with selector `sprouts`. They accept `seed`, `variant`, `density`, optional `reach`, and `static`.

## Compiled assets

Create `sprouts.config.json` with an `assets` array. Every asset needs `output`, `format` (`gif` or `webp`), `width`, `height`, and `seed`; it can also set `variant`, `density`, `reach`, and `fps`. The renderer produces a transparent grow-once animation and holds its final frame. Run `npx sprouts render --config sprouts.config.json` after installing `@mariosakka/sprouts-renderer`.
