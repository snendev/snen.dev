/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import readJsonAPI from "../data/readJsonAPI.ts";
import type { EntriesListResponse } from "../../files/types.ts";

interface ArchiveProps {
  url: URL;
}

export default function Archive({ url }: ArchiveProps) {
  const archive = readJsonAPI<EntriesListResponse>(url.origin, "entries");
  return (
    <div>
      {archive.map(({ slug }, i) => (
        <div
          key={i}
          onClick={() => console.log(slug)}
        >
          {slug}
        </div>
      ))}
    </div>
  );
}
