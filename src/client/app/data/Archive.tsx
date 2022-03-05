/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type { SiteEntryMetadata } from "../../../server/files/types.ts";

import { Block } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";
import MiniCard from "./MiniCard.tsx";

export default function Archive() {
  const archive = readJsonAPI<SiteEntryMetadata[]>("feed");
  return (
    <nav aria-label="Archive: Links to old posts">
      <h3 className="text-align-center">Archive</h3>
      {archive.map(({ title, category, subhead, slug }: SiteEntryMetadata) => (
        <Block key={slug} additionalDepth={3}>
          <MiniCard
            to={`/${category}/${slug}`}
            title={title}
            label={subhead}
          />
        </Block>
      ))}
    </nav>
  );
}
