import { parse } from "https://deno.land/std/flags/mod.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.14.11/mod.js";

const {minify, sourcemap} = parse(Deno.args);

const entrypoints = [
  "src/client/App.tsx",
];
for await (const entry of Deno.readDir("src/client/content")) {
  entrypoints.push(`src/client/content/${entry.name}`);
}
console.log(`Bundling ${entrypoints.length} files...`)

const config = {
  entryPoints: entrypoints,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
  } as const,
  bundle: true,
  format: "esm" as const,
  target: "esnext",
  minify: !!minify,
  sourcemap: !!sourcemap,
  jsx: "transform" as const,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  outdir: "dist",
  external: [
    "https://esm.sh/react@18.0.0-rc.0?pin=v59",
    "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59",
  ],
};

await esbuild.build(config);
console.log(`Succesfully bundled ${entrypoints.join(", ")}.`);

esbuild.stop();
