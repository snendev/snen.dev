#!/bin/bash

rm -rf dist
mkdir dist

deno bundle --import-map import_map.json ./src/App.tsx dist/App.js
mkdir dist/content
deno bundle --import-map import_map.json ./src/content/Posts.tsx dist/content/Posts.js
