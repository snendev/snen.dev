# snen.dev

https://snen.dev

## Tech

Based on https://codesandbox.io/s/kind-sammet-j56ro (React 18 RC demo) but
using Deno 1.19.0.

### How to read this code

Most directories have READMEs that should help describe how each file is used.
These should serve as a decent entrypoint.

In general, the layout is relatively straightforward:

- `/assets` contains public assets like images and video files
- `/public` contains public resources like css
- `/entries` contains posts for content I've written or made
- `/build` contains build scripts, which ideally are few
- `/src` contains all the application code
  - `/deps` contains any 3rd-party code
  - `/server` contains all the code for running the server and managing file data (e.g. post content)
  - `/client` contains all the client code, including entrypoints for client and server
    - `/app/data` contains any components or code that have to do with data requests
    - `/app/layout` contains any components that structure the layout of basic pages
    - `/app/pages` contain components definitions for each application route

## Tools/References

- [figma](https://www.figma.com), where I sketched layouts to help me figure out what I wanted to build
- [palettte](https://palettte.app/), where I experimented with colors
- [ultrajs](https://ultrajs.dev), a framework for building react-in-deno applications. (it seems like a great package!) I referenced some commits in this repository early on, as I studied the new React 18 changes.
