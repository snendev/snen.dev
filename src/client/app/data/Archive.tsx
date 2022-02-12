/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx";
import type {
  EntriesListResponse,
  SiteEntryMetadata,
} from "../../../server/files/types.ts";

import readJsonAPI from "./api/readJsonAPI.ts";

export default function Archive() {
  const archive = readJsonAPI<EntriesListResponse>("entries");
  return (
    <div>
      {archive.map(({ title, category, slug }: SiteEntryMetadata) => (
        <Link
          key={slug}
          to={`/${category}/${slug}`}
        >
          <h5>
            {title}
          </h5>
          <span>
            {category}
          </span>
        </Link>
      ))}
    </div>
  );
}
