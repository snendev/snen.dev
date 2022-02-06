#!/bin/bash

rm -rf dist
mkdir dist

deno run --allow-read --allow-env --allow-net --allow-write --allow-run ./build/build.ts --sourcemap
