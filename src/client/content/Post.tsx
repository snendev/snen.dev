/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";
import { useTheme } from "../theme.tsx"
import type {
  EntriesDetailResponse,
} from "../../files/types.ts";
import readJsonAPI from "../data/readJsonAPI.ts";
import suspendData from "../data/suspendData.ts";

interface PostProps {
  slug: string
}

export default function Post({ slug }: PostProps) {
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  // const html = Marked.parse(entry.content).content;

  const { getClassname } = useTheme()
  const titleCss = getClassname("dark", 2);

  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  console.log({entry, isPostCollapsibleGuess})
  return (
    <article>
      <h3 className={`title ${titleCss}`}>
        {entry.metadata.title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
    </article>
  );
}
