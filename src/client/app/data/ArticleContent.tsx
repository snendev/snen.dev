/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"
import type {
  EntriesDetailResponse,
} from "../../../server/files/types.ts";

import { Layer, Header } from "../theme.tsx"

import readJsonAPI from "./api/readJsonAPI.ts";

export default function ArticleContent() {
  // TODO does this order work?
  const { slug } = useParams<'slug'>();
  console.log(slug)
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
