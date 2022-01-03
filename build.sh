#!/bin/bash

rm -rf dist
mkdir dist

deno bundle ./src/deps.ts dist/deps.js
deno bundle ./src/App.tsx dist/App.js
mkdir dist/content
mkdir dist/pages
deno bundle ./src/content/Archive.tsx dist/content/Archive.js
deno bundle ./src/content/Posts.tsx dist/content/Posts.js
