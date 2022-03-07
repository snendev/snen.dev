export default async function walkDirectory(
  path: string,
  handleFile: (path: string, name: string) => Promise<void>
): Promise<void> {
  for await (const { name, isDirectory, isFile } of Deno.readDir(path)) {
    if (isDirectory) await walkDirectory(`${path}/${name}`, handleFile)
    if (isFile) await handleFile(path, name)
  }
}
