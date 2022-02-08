/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type {
  EntriesListResponse,
  SiteEntryMetadata,
} from "../../../server/files/types.ts";

import readJsonAPI from "./api/readJsonAPI.ts";

export default function Archive() {
  const archive = readJsonAPI<EntriesListResponse>("entries");
  return (
    <div>
      {archive.map(({ title, category }: SiteEntryMetadata, i: number) => (
        <div
          key={i}
          onClick={() => console.log(title)}
        >
          <h5>
            {title}
          </h5>
          <span>
            {category}
          </span>
        </div>
      ))}
    </div>
  );
}
