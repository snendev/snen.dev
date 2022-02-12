import loadEntries from "./loadEntries.ts";
import buildRSSFeed from "./rss.ts";
import type {
  EntriesDetailResponse,
  EntriesListResponse,
  EntryCategory,
} from "./types.ts";

const ENTRIES_DIR = "./entries";

const entries = await loadEntries(ENTRIES_DIR);

function getCategoryEntries(category: EntryCategory) {
  return Object.values(entries).filter((entry) => entry.category === category);
}

export function readDirectory(feed?: string): EntriesListResponse | null {
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

export async function readFile(slug: string): Promise<EntriesDetailResponse> {
  const content = await Deno.readTextFile(`${ENTRIES_DIR}/${slug}.md`);
  const metadata = entries[slug];
  return { content, metadata };
}

export async function readRSSFeed(feed?: string): Promise<string | null> {
  const files = readDirectory(feed)
  return files ? await buildRSSFeed(files) : null
}
