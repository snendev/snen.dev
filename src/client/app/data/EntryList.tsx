/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type {
  EntryCategory,
  SiteEntryMetadata,
} from "../../../server/files/types.ts";

import { Block } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";
import GenericEntryCard from "./GenericEntryCard.tsx";

interface EntryListProps {
  feed?: EntryCategory;
}

export default function EntryList({ feed }: EntryListProps) {
  const data: SiteEntryMetadata[] = feed
    ? readJsonAPI("feed", feed)
    : readJsonAPI("feed");
  return (
    <div>
      {data.map(({ category, slug }) => (
        <Block key={slug}>
          <GenericEntryCard category={category} slug={slug} />
        </Block>
      ))}
    </div>
  );
}
