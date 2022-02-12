export type EntryCategory = "about" | "reading" | "tech" | "media";

interface SiteEntryDeclaredMetadata {
  category: EntryCategory;
  // title/headline of the entry
  title: string;
  // secondary headline for the entry
  subhead: string;
  tags: string[];
}

export interface SiteEntryMetadata extends SiteEntryDeclaredMetadata {
  category: EntryCategory;
  // title/headline of the entry
  title: string;
  // unique slug
  slug: string;
  // secondary headline for the entry
  subhead: string;
  // first section of text of the entry for preview reading
  abstract: string;
  // link to site entry on snen.dev
  href: string;
  // permalink to github file at current commit
  permalink: string; // TODO is this ok? if i want to edit, source file will change.
  // content tagging
  tags: string[];
  // publish date
  publishDate: Date;
  // last modified date
  modifyDate: Date;
}

export type EntriesListResponse = SiteEntryMetadata[];
export interface EntriesDetailResponse {
  content: string;
  metadata: SiteEntryMetadata;
}
