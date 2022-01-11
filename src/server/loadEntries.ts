import { Marked } from "./deps.ts";

const REPO_LINK = Deno.env.get("REPO_LINK");

interface SiteEntryDeclaredMetadata {
  category: "tech" | "games" | "media" | "about"
  // title/headline of the entry
  title: string
  // secondary headline for the entry
  subhead: string
  tags: string[]
}

export interface SiteEntryMetadata extends SiteEntryDeclaredMetadata {
  category: "tech" | "games" | "media" | "about"
  // title/headline of the entry
  title: string
  // unique slug
  slug: string
  // secondary headline for the entry
  subhead: string
  // first section of text of the entry for preview reading
  abstract: string
  // link to site entry on snen.dev
  href: string
  // permalink to github file at current commit
  permalink: string
  // content tagging
  tags: string[]
  // publish date
  publishDate: Date
  // last modified date
  modifyDate: Date
}

async function collectSiteEntries(directory: string): Promise<SiteEntryMetadata[]> {
  const entries: SiteEntryMetadata[] = [];
  for await (const {name, isDirectory, isFile} of Deno.readDir(directory)) {
    if (isDirectory) {
      const subEntries = await collectSiteEntries(`${directory}/${name}`);
      entries.concat(subEntries.map((entry) => {
        entry.tags.push(name);
        return entry;
      }));
    }
    if (isFile) {
      const path = `${directory}/${name}`;
      const slug = name.slice(0, name.length - 3);
      const href = `https://snen.dev/${slug}`;
      const permalink = `${REPO_LINK}/tree/main/entries/${slug}`;
      const { birthtime, mtime } = await Deno.stat(path);
      if (name.endsWith('.md')) {
        const source = await Deno.readTextFile(path);
        const { meta: metadata } = Marked.parse(source);
        // try to get the first "section" of text
        // skip the frontmatter, then get the first #, from the line after that until the next #.
        const abstract = source.split('---')[2]
          .split('#')[1]
          .split('\n')
          .slice(1)
          .join('\n')
          .trim();
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
  return entries;
}

export default async function loadAllEntries(
  directory: string,
): Promise<Record<string, SiteEntryMetadata>> {
  const entries = await collectSiteEntries(directory)
  return Object.fromEntries(
    entries.map(
      (metadata) => ([metadata.slug, metadata])
    )
  );
}
