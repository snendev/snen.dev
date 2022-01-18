/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../deps/react.ts";
import type {
  EntriesDetailResponse,
} from "../../../files/types.ts";

import { useTheme } from "../../theme.tsx"

import readJsonAPI from "./api/readJsonAPI.ts";

interface PostProps {
  slug: string
}

export default function Post({ slug }: PostProps) {
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  // const html = Marked.parse(entry.content).content;

  const { getClassname } = useTheme()
  const titleCss = getClassname("dark", 2);

  return (
    <article>
      <h3 className={`title ${titleCss}`}>
        {entry.metadata.title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </article>
  );
}
