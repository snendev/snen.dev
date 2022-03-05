import { SiteEntryMetadata } from "./types.ts";

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

export default function buildRSSFeed(items: SiteEntryMetadata[]) {
  if (items.length === 0) return null;
  const itemBlocks = items
    .map(({ title, subhead, href, permalink, publishDate, tags }) => `
      <item>
        <title>${title}</title>
        <description>${subhead}</description>
        ${tags.map((tag) => `<category>${tag}</category>`).join("\n")}
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
