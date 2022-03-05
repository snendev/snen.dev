export type EntryCategory = "about" | "reading" | "tech" | "media";

interface SiteEntryDeclaredMetadata {
  category: EntryCategory;
  // title/headline of the entry
  title: string;
  // secondary headline for the entry
  subhead: string;
  tags: string[];
  slug: string;
  pathToResource: string;
  previewImageSrc?: string;
  imports?: string[];
}

interface DynamicResourceDeclaredMetadata {
  modifyDate: string;
  publishDate: string;
  abstract: string;
}

export interface VariantSiteEntryMetadata extends SiteEntryDeclaredMetadata {
  dynamicResourceMetadata?: DynamicResourceDeclaredMetadata;
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
  // optional preview image
  previewImageSrc?: string;
  // last modified date
  modifyDate: Date;
}
