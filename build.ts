import { parse } from "https://deno.land/std@0.120.0/flags/mod.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.14.11/mod.js";

const { minify, sourcemap } = parse(Deno.args);

const entryPoints = [
  "src/client/App.tsx",
  "src/client/index.tsx",
];
for await (const entry of Deno.readDir("src/client/content")) {
  entryPoints.push(`src/client/content/${entry.name}`);
}
console.log(`Bundling ${entryPoints.length} files...`);

const config = {
  entryPoints,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
  } as const,
  bundle: true,
  format: "esm" as const,
  splitting: true,
  target: "esnext",
  minify: !!minify,
  sourcemap: !!sourcemap,
  jsx: "transform" as const,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  outdir: "dist",
  external: [
    "https://*",
  ],
};

await esbuild.build(config);
console.log(`Succesfully bundled ${entryPoints.join(", ")}.`);

esbuild.stop();
