#!/bin/bash
REACT_SSR_DEBUG=true deno --unstable run --allow-read --allow-net --allow-env --log-level=debug ./src/server.tsx
