#!/bin/bash

rm -rf dist
mkdir dist

deno bundle --no-remote ./src/deps.ts dist/deps.js
deno bundle --no-remote ./src/App.tsx dist/App.js
mkdir dist/content
deno bundle --no-remote ./src/content/Archive.tsx dist/content/Archive.js
deno bundle --no-remote ./src/content/Posts.tsx dist/content/Posts.js
