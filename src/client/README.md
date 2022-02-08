# Web client source files

The webpage is built using React 18.
The files in this directory are compiled by
[esbuild](https://esbuild.github.io) and served to browsers by the server.

The bulk of client code is in [`./app`](./app).
It contains mostly React components and some Suspense-powered data-fetching
mechanisms (that are not quite fully integrated).

## Web bundle

The HTML bundle entrypoint is [entrypoint.tsx](./entrypoint.tsx), which wraps
[App.tsx](./App.tsx) in a `React.StrictMode` and a `ReactRouter` `BrowserRouter`
before mounting it to a `#root` div element.

## Server

Server-rendering capability is exposed via
[server/render.tsx](./server/render.tsx), which wraps the same `App` component
in a `ReactRouter` `StaticRouter` and then an
[HTML "template"](./server/Html.tsx) (and then `StrictMode`).
It calls `React.renderToReadableStream` on this node and returns the stream.
