/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type {
  EntriesDetailResponse,
} from "../../../files/types.ts";

import { Layer, Header } from "../theme.tsx"

import readJsonAPI from "./api/readJsonAPI.ts";

interface PostProps {
  slug: string
}

export default function Post({ slug }: PostProps) {
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  // const html = Marked.parse(entry.content).content;

  return (
    <Layer>
      <article>
        <Header>
          <h3 className="title">
            {entry.metadata.title}
          </h3>
        </Header>
        <div dangerouslySetInnerHTML={{ __html: entry.content }} />
      </article>
    </Layer>
  );
}
