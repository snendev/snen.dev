/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type { SiteEntryMetadata } from "../../../server/files/types.ts";

import { Block, Layer } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";

interface ItchIOPreviewProps {
  title: string;
  previewTitle: string;
  previewImageSrc?: string;
  gameURL: string;
}

function ItchIOPreview({
  title,
  previewTitle,
  previewImageSrc,
  gameURL,
}: ItchIOPreviewProps) {
  return (
    <article>
      <Layer
        headerTitle={previewImageSrc ? undefined : title}
        className="card"
      >
        {previewImageSrc
          ? (
            <a href={gameURL}>
              <img
                src={previewImageSrc}
                alt={previewTitle}
                className="width-100"
              />
            </a>
          )
          : null}
        <Block>
          <h4>{previewTitle}</h4>
          <a href={gameURL}>
            Play on itch.io
          </a>
        </Block>
      </Layer>
    </article>
  );
}

interface ItchIOShowcaseProps {
  slug: string;
}

export default function ItchIOShowcase({
  slug,
}: ItchIOShowcaseProps) {
  const metadata = readJsonAPI<SiteEntryMetadata>("entries", slug);

  return (
    <ItchIOPreview
      title={metadata.title}
      previewTitle={metadata.abstract}
      previewImageSrc={metadata.previewImageSrc}
      gameURL={metadata.pathToResource}
    />
  );
}
