/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import React from "../react.ts";

import readJsonAPI from "../data/readJsonAPI.ts";
import suspendData from "../data/suspendData.ts";
import type {
  EntriesListResponse,
  EntriesDetailResponse,
} from "../../server/apiTypes.ts"

interface PostProps {
  url: URL;
  slug: string;
}

function Post({ url, slug }: PostProps) {
  const entry = readJsonAPI<EntriesDetailResponse>(url.origin, "entries", slug);
  const html = suspendData<string>(
    `parse-markdown/${slug}`,
    () =>
      new Promise((resolve) => {
        const result = Marked.parse(entry.content);
        resolve(result.content);
      }),
  );

  const [counter, setCounter] = React.useState(0);
  function onClick() {
    setCounter((prev) => prev + 1);
  }

  return (
    <div>
      <div>
        {counter}
        <button onClick={onClick}>+</button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
interface PostsProps {
  url: URL;
}

export default function Posts({ url }: PostsProps) {
  const data = readJsonAPI<EntriesListResponse>(url.origin, "entries");
  return (
    <div>
      {data.map(({slug}) => (
        <React.Suspense fallback={<div />}>
          <Post url={url} slug={slug} />
        </React.Suspense>
      ))}
    </div>
  );
}
