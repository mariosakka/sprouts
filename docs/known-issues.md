# Known issues

GIF is limited to a 256-colour palette and is generally larger than WebP. Use WebP when browser support permits.

The live Vue, React, and Angular adapters share the core renderer but currently have no browser component test suite; CI type-checks and builds all three adapters.

The Vue component does not restart its animation when props change after the animation has finished. Give it a `key` to remount (see [examples](examples.md)).

The live components ship no CSS and do not read `prefers-reduced-motion`; see the [guide](guide.md).
