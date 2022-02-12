import entries from "../../../entries/entries.json" assert {type: "json"}

import { EntryCategory, SiteEntryMetadata } from "./types.ts";

const REPO_LINK = Deno.env.get("REPO_LINK");

async function collectSiteEntries(
  directory: string,
): Promise<SiteEntryMetadata[]> {
  const collection: SiteEntryMetadata[] = await Promise.all(
    entries.map(async ({ file, ...metadata }) => {
      const path = `${directory}/${file}`;
      const { birthtime, mtime } = await Deno.stat(path);
      const source = await Deno.readTextFile(path);
      // try to get the first "section" of text
      const abstract = source.split("#")[1].trim();
      const filename = file.slice(0, file.length - 3);
      const slug = filename;
      const href = `https://snen.dev/${slug}`;
      const permalink = `${REPO_LINK}/tree/main/entries/${slug}`;
      return {
        category: metadata.category as EntryCategory,
        title: metadata.title,
        slug,
        subhead: metadata.subhead,
        abstract,
        href,
        permalink,
        tags: metadata.tags,
        publishDate: birthtime ?? new Date(),
        modifyDate: mtime ?? new Date(),
      };
    })
  )
  return collection.sort((a, b) => {
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
