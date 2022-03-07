import { parse } from "https://deno.land/std@0.120.0/flags/mod.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.14.11/mod.js";

import compressStaticFiles from "./compress.ts"
import buildRSS from "./rss.ts"
import buildThemeCSS from "./theme.ts"
import walkDirectory from "./walkDirectory.ts"

const { minify, sourcemap } = parse(Deno.args);

const entryPoints = [
  "src/client/App.tsx",
  "src/client/entrypoint.tsx",
];
for await (const entry of Deno.readDir("src/client/app/data")) {
  if (entry.isFile) entryPoints.push(`src/client/app/data/${entry.name}`);
}
console.log(`Bundling ${entryPoints.length} files...`);

const config: esbuild.BuildOptions = {
  entryPoints,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
  } as const,
  format: "esm" as const,
  bundle: true,
  splitting: true,
  target: "esnext",
  minify: !!minify,
  sourcemap: !!sourcemap,
  jsx: "transform" as const,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  outdir: "dist",
  external: [],
};

await esbuild.build(config);
console.log(`Succesfully bundled ${entryPoints.join(", ")}.`);

esbuild.stop();

console.log("Now generating theme-based CSS...");

const paletteCss = buildThemeCSS();
await Deno.writeTextFile("dist/theme.css", paletteCss);

console.log("Building RSS files...")

await buildRSS();

console.log("Copying public files into dist...")

async function copyFile(path: string, name: string) {
  const distPath = ["dist", ...path.split("/").slice(1)].join("/");
  await Deno.copyFile(`${path}/${name}`, `${distPath}/${name}`);
}

walkDirectory("public", copyFile)
walkDirectory("entries", copyFile)

console.log("Compressing static resources...")

await compressStaticFiles("dist");

console.log("Done!")
