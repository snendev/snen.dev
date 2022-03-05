# Build scripts

This directory houses some simple build scripts to help build the web bundle.

## build.ts

This file bundles client files using [esbuild](https://esbuild.github.io). The
configuration is set up to minimize bundle size when code splitting by letting
the browser import remote resources, but no further optimization is specified.
It also calls the palette builder.

## palette.ts

This is a simple file that imports a JSON blob build by https://palettte.app/
(the site isn't _particularly_ important, although it is a useful tool -- the
JSON blob describes a strict shape of colors and layer depth.) This blob defines
the color variables used for the theme and builds css classes that can be easily
referenced by color-code and layer.

This palette is the foundation for the
[theme specification](/src/client/app/theme.tsx) and themed components used by
the app.
