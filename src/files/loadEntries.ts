import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

import { SiteEntryMetadata } from "./types.ts";

const REPO_LINK = Deno.env.get("REPO_LINK");

function buildSlug(category: string, filename: string): string {
  switch (category) {
    case "about":
      return filename;
    case "read":
      return `read/${filename}`;
    case "tech":
      return `tech/${filename}`;
    case "media":
      return `media/${filename}`;
    default:
      return filename;
  }
}

async function collectSiteEntries(
  directory: string,
): Promise<SiteEntryMetadata[]> {
  const entries: SiteEntryMetadata[] = [];
  for await (const { name, isDirectory, isFile } of Deno.readDir(directory)) {
    if (isDirectory) {
      const subEntries = await collectSiteEntries(`${directory}/${name}`);
      entries.concat(subEntries.map((entry) => {
        entry.tags.push(name);
        return entry;
      }));
    }
    if (isFile) {
      const path = `${directory}/${name}`;
      const { birthtime, mtime } = await Deno.stat(path);
      if (name.endsWith(".md")) {
        const source = await Deno.readTextFile(path);
        const { meta: metadata } = Marked.parse(source);
        // try to get the first "section" of text
        // skip the frontmatter, then get the first #, from the line after that until the next #.
        const abstract = source.split("---")[2]
          .split("##")
          .slice(1)
          .join('#')
          .trim();
        const filename = name.slice(0, name.length - 3);
        const slug = buildSlug(metadata.category, filename);
        const href = `https://snen.dev/${slug}`;
        const permalink = `${REPO_LINK}/tree/main/entries/${slug}`;
        entries.push({
          category: metadata.category,
          title: metadata.title,
          slug,
          subhead: metadata.subhead,
          abstract,
          href,
          permalink,
          tags: metadata.tags,
          publishDate: birthtime ?? new Date(),
          modifyDate: mtime ?? new Date(),
        });
      }
    }
  }
  return entries.sort((a, b) => {
    const value = a.modifyDate.valueOf() - b.modifyDate.valueOf();
    return Math.abs(value);
  });
}

export default async function loadEntries(
  directory: string,
): Promise<Record<string, SiteEntryMetadata>> {
  const entries = await collectSiteEntries(directory);
  return Object.fromEntries(
    entries.map(
      (metadata) => [metadata.slug, metadata],
    ),
  );
}
