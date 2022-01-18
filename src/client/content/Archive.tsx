/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import readJsonAPI from "../data/readJsonAPI.ts";
import type { EntriesListResponse } from "../../files/types.ts";

export default function Archive() {
  const archive = readJsonAPI<EntriesListResponse>("entries");
  return (
    <div>
      {archive.map(({ title, category }, i) => (
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
