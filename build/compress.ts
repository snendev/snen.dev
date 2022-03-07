import { gzipFile } from "https://deno.land/x/compress@v0.3.6/mod.ts";

import walkDirectory from "./walkDirectory.ts"

async function compressFile(path: string, name: string): Promise<void> {
  const currentPath = `${path}/${name}`;
  await gzipFile(currentPath, `${currentPath}.gz`);
}

export default async function compressStaticFiles(path: string) {
  await walkDirectory(path, compressFile)
}
