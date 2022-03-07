import { SiteEntryMetadata, EntryCategory } from "../src/server/files/types.ts";
import { readDirectory } from "../src/server/files/mod.ts"

// replace `GMT` suffix with `+0000` since it matches other feeds
function formatDate(date: Date): string {
  return `${date.toUTCString().replace("GMT", "")} +0000`;
}

function max<T>(collection: T[], iteratee: (item: T) => number): T {
  return collection.reduce(
    (current, value) => iteratee(value) > iteratee(current) ? value : current,
    collection[0],
  );
}

function buildRSSFeed(items: SiteEntryMetadata[]) {
  if (items.length === 0) return null;
  const itemBlocks = items
    .map(({ title, subhead, href, permalink, publishDate, tags }) => `
      <item>
        <title>${title}</title>
        <description>${subhead}</description>
        ${tags.map((tag) => `<category>${tag}</category>`).join('\n')}
        <link>${href}</link>
        <guid>${permalink}</guid>
        <pubDate>${formatDate(publishDate)}</pubDate>
      </item>
    `);

  // get most recent build time from the last modifyDate
  // modifyDate will always be > publicationDate
  const lastBuildDate =
    max(items, (item) => item.modifyDate.valueOf()).modifyDate;

  return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
      <title>snen.dev</title>
      <description>A feed about code, games, and other things.</description>
      <link>https://snen.dev</link>
      <copyright>2022 snen.dev All rights reserved</copyright>
      <lastBuildDate>${formatDate(lastBuildDate)}</lastBuildDate>
      <pubDate>Thur, 20 Jan 2022 12:00:00 +0000</pubDate>
      <managingEditor>me@snen.dev</managingEditor>
      <webmaster>me@snen.dev</webmaster>
      <docs>https://www.rssboard.org/rss-specification</docs>
      <ttl>1800</ttl>
      ${itemBlocks.join("")}

    </channel>
    </rss>`;
}

async function readRSSFeed(feed?: string): Promise<string | null> {
  const files = readDirectory(feed)
  return files ? await buildRSSFeed(files) : null
}


const FEEDS: (EntryCategory | undefined)[] = [
  undefined,
  "about",
  "reading",
  "tech",
  "media",
]

export default async function build() {
  for await (const feed of [undefined, ...FEEDS]) {
    const rssFileText = await readRSSFeed(feed);
    if (!rssFileText) return;
    await Deno.writeTextFile(`dist/${feed ?? "index"}.xml`, rssFileText);
  }
}
