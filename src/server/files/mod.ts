import loadEntries from "./loadEntries.ts";
import buildRSSFeed from "./rss.ts";
import type {
  SiteEntryMetadata,
  EntryCategory,
} from "./types.ts";

const ENTRIES_DIR = "./entries";

const entries = await loadEntries(ENTRIES_DIR);

function getCategoryEntries(category: EntryCategory) {
  return Object.values(entries).filter((entry) => entry.category === category);
}

export function getEntryMetadata(slug: string): SiteEntryMetadata | null {
  return entries[slug] ?? null
}

export function readDirectory(feed?: string): SiteEntryMetadata[] | null {
  switch (feed) {
    case undefined:
      return Object.values(entries);
    case "about":
      return getCategoryEntries("about");
    case "reading":
      return getCategoryEntries("reading");
    case "tech":
      return getCategoryEntries("tech");
    case "media":
      return getCategoryEntries("media");
    default:
      return null;
  }
}

export async function readFile(slug: string): Promise<string> {
  return await Deno.readTextFile(`${ENTRIES_DIR}/${slug}.md`);
}

export async function readRSSFeed(feed?: string): Promise<string | null> {
  const files = readDirectory(feed)
  return files ? await buildRSSFeed(files) : null
}
