/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"
import type {
  EntriesDetailResponse,
} from "../../../server/files/types.ts";

import { Block, Layer } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";
import Markdown from "./Markdown.tsx"

export default function ArticleContent() {
  // TODO does this order work?
  const { slug } = useParams<'slug'>();
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  // const html = Marked.parse(entry.content).content;

  return (
    <article className="article">
      <Layer headerTitle={entry.metadata.title}>
        <Block>
          <Markdown source={entry.content} />
        </Block>
      </Layer>
    </article>
  );
}
