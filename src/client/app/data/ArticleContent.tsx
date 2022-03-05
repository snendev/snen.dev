/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type { SiteEntryMetadata } from "../../../server/files/types.ts";

import { Block, Layer } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";

type LazyComponent = React.LazyExoticComponent<
  (props: { slug: string; limitSections?: number }) => React.ReactElement
>;
const Markdown: LazyComponent = React.lazy(async () =>
  await import("./Markdown.tsx")
);

interface ArticleContentProps {
  slug: string;
}

export default function ArticleContent({ slug }: ArticleContentProps) {
  const metadata = readJsonAPI<SiteEntryMetadata>("entries", slug);

  React.useEffect(() => {
    metadata.imports?.map(async (importSrc) => await import(importSrc));
  }, [metadata]);

  return (
    <article className="article">
      <React.Suspense fallback={<div />}>
        <Layer headerTitle={metadata.title}>
          <Block>
            <Markdown slug={slug} />
          </Block>
        </Layer>
      </React.Suspense>
      {metadata.imports?.map((importSrc) => (
        <script charSet="utf-8" src={importSrc} />
      ))}
    </article>
  );
}
