import getMetadata from "./getMetadata.ts";
import type {
  SiteEntryMetadata,
  EntryCategory,
} from "./types.ts";

const ENTRIES_DIR = "./entries";

const entries = await getMetadata(ENTRIES_DIR);

function getCategoryEntries(category: EntryCategory) {
  return Object.values(entries).filter((entry) => entry.category === category);
}

export function getEntryMetadata(slug: string): SiteEntryMetadata | null {
  return entries[slug] ?? null;
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
