import entries from "../../../entries/entries.json" assert {type: "json"}

import { EntryCategory, SiteEntryMetadata, VariantSiteEntryMetadata } from "./types.ts";

const siteEntries = entries as VariantSiteEntryMetadata[]

const REPO_LINK = Deno.env.get("REPO_LINK");

async function collectSiteEntries(
  directory: string,
): Promise<SiteEntryMetadata[]> {
  return await Promise.all(
    siteEntries.map(async ({
      pathToResource,
      category,
      title,
      subhead,
      tags,
      slug,
      previewImageSrc,
      dynamicResourceMetadata,
      imports,
    }) => {
      if (dynamicResourceMetadata !== undefined) {
        const { publishDate, modifyDate, abstract } = dynamicResourceMetadata
        const href = `https://snen.dev/${slug}`;
        return {
          category: category as EntryCategory,
          title,
          slug,
          subhead,
          abstract,
          href,
          permalink: pathToResource,
          tags,
          publishDate: new Date(publishDate),
          modifyDate: new Date(modifyDate),
          previewImageSrc,
          pathToResource,
          imports,
        };
      }
      const path = `${directory}/${pathToResource}`;
      const { birthtime, mtime } = await Deno.stat(path);
      const source = await Deno.readTextFile(path);
      // try to get the first "section" of text
      const abstract = source.split("#")[1].trim();
      const href = `https://snen.dev/${slug}`;
      const permalink = `${REPO_LINK}/tree/main/entries/${slug}`;
      return {
        category: category as EntryCategory,
        title,
        slug,
        subhead,
        abstract,
        href,
        permalink,
        tags,
        previewImageSrc,
        publishDate: birthtime ?? new Date(),
        modifyDate: mtime ?? new Date(),
        pathToResource,
        imports,
      };
    })
  )
}

export default async function loadEntries(
  directory: string,
): Promise<Record<string, SiteEntryMetadata>> {
  const collection = await collectSiteEntries(directory);
  return Object.fromEntries(
    collection.map(
      (metadata) => [metadata.slug, metadata],
    ),
  );
}
