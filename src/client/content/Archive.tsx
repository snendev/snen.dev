/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import readJsonAPI from "../data/readJsonAPI.ts";
import type { EntriesListResponse } from "../../server/apiTypes.ts"

interface ArchiveProps {
  url: URL;
}

export default function Archive({ url }: ArchiveProps) {
  const archive = readJsonAPI<EntriesListResponse>(url.origin, "entries");
  return (
    <div>
      {archive.map(({slug}, i) => (
        <span key={i} onClick={() => console.log(slug)}>{slug}</span>
      ))}
    </div>
  );
}
