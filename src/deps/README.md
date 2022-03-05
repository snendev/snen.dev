# Site Dependencies

This site depends on a number of third-party libraries.

These are generally linked to via CDN. This site uses
[deno.land/x](https://deno.land/x/oak@v10.1.0/mod.ts) (see [oak.ts](./oak.ts))
and [esm.sh](https://esm.sh/) to grab third-party npm packages (in particular,
[React](./react.ts)). However, some cases are complicated and I don't want to
debug them. (In particular, React versions in deep dependencies _really_ need to
match.) In those cases, I have copied the source files and documented
appropriately.

Managing each dependency in a separate file in this way comes with some small
but interesting advantages. Initially, it was a requirement for the solution
described above, but at this point I have found it quite convenient and adopted
the pattern wholesale for consistency. One nice detail is enabled by an
[esbuild](https://esbuild.github.io) feature, the
[`external` option](https://esbuild.github.io/api/#external) (see also
[my configuration](/git/snen.dev/tree/main/build/build.ts#34)). This tells
esbuild to ignore imports targeting remote URLs, since the browser can `import`
those itself. This ensures that external resources are only loaded when they're
needed by the page! It also avoids issues where distinct chunks want access to
the same external resource: rather than bundling the external code into each
chunk, increasing bundle size, we leverage the browser's storage.
