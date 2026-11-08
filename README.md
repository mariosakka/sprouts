# Sprouts

Deterministic botanical SVG art for live Vue, React, and Angular interfaces, or pre-rendered GIF/WebP assets.

## Packages

- `@mariosakka/sprouts`: seed-based layout and SVG frame rendering.
- `@mariosakka/sprouts-vue`: live Vue 3 overlay.
- `@mariosakka/sprouts-react`: live React overlay for React 18 and 19.
- `@mariosakka/sprouts-angular`: standalone Angular component for Angular 20 and newer (signal inputs).
- `@mariosakka/sprouts-renderer`: Node rendering API and `sprouts render` CLI.

All five packages are published at `0.1.0`. Run `npm run check` to validate the workspace and `npm run prepare` after cloning to install the local hook.

## Documentation

- [Guide](docs/guide.md): which package to pick, concepts, and how to place the overlay.
- [Examples](docs/examples.md): reduced motion, lists, Node and CLI recipes.
- Each package has its own README on npm and under `packages/`.

## Releases

Packages share one version. Release Please opens a release PR from Conventional Commits; the workflow then runs CI on that exact commit and squash-merges the PR only if it passes. The release PR updates the workspace and all package manifests, and creates a matching `v<version>` tag and GitHub release when that PR is merged. It then dispatches the trusted-publishing workflow, which verifies the tag against every package manifest before publishing the five packages in dependency order. Publishing is dispatch-only, so a historical GitHub release cannot republish an existing npm version. The initial `0.2.0` release retains its legacy `sprouts-v0.2.0` tag; subsequent releases use `v<version>`.

## Live adapters

Each framework adapter exports a decorative `Sprouts` overlay driven by the core's seeded SVG renderer. Vue exposes `Sprouts`, React exports the `Sprouts` component, and Angular exports the standalone `SproutsComponent` with selector `sprouts`. They accept `seed`, `variant`, `density`, optional `reach`, and `static`.

## Compiled assets

Create `sprouts.config.json` with an `assets` array. Every asset needs `output`, `format` (`gif` or `webp`), `width`, `height`, and `seed`; it can also set `variant`, `density`, `reach`, and `fps`. The renderer produces a transparent grow-once animation and holds its final frame. Run `npx sprouts render --config sprouts.config.json` after installing `@mariosakka/sprouts-renderer`.
