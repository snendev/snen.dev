#!/bin/bash
deno --unstable run --allow-read --allow-net --import-map import_map.json ./src/server.tsx
