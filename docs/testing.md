# Testing

`npm run check` runs type checks, linting, unit tests, and builds every package. Core tests cover deterministic geometry and SVG progress; renderer tests inspect encoded animated WebP metadata. The documentation contract test verifies that the README lists every published package and all supported live adapters. Vue, React, and Angular adapters currently receive strict type checks and package-build validation; component lifecycle tests are planned before a post-0.1 release.

CI also runs `scripts/check-docs-sync.mjs`: a package source or manifest change must include a change to `README.md` or `docs/`. This keeps user-facing documentation aligned without forcing documentation edits for tests-only changes.
