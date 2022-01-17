/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";
import { useTheme } from "../theme.tsx"
import type {
  EntryCategory,
  EntriesDetailResponse,
  EntriesListResponse,
} from "../../files/types.ts";
import readJsonAPI from "../data/readJsonAPI.ts";
import suspendData from "../data/suspendData.ts";

interface PostProps {
  url: URL;
  category: EntryCategory;
  slug: string;
}

function Post({ url, category, slug }: PostProps) {
  const entry = readJsonAPI<EntriesDetailResponse>(url.origin, "entries", slug);
  // const html = suspendData<string>(
  //   `parse-markdown/${slug}`,
  //   () =>
  //     new Promise((resolve) => {
  //       const result = Marked.parse(entry.content);
  //       resolve(result.content);
  //     }),
  // );

  const [isExpanded, setIsExpanded] = React.useState(false);
  function onClick() {
    setIsExpanded((prev) => !prev);
  }

  const { getClassname } = useTheme()
  const cardCss = getClassname("surface", 0);
  const cardHeaderCss = getClassname("dark", 2);

  const fullPostHref = `${category === "about" ? "" : `/${category}`}/${slug}`;
  return (
    <section className={`card ${cardCss}`}>
      <a href={fullPostHref}>
        <div className={cardHeaderCss}>
          {entry.metadata.title}
        </div>
      </a>
      <div dangerouslySetInnerHTML={{ __html: entry.content }} />
      <button className="card-expander" onClick={onClick}>
        {isExpanded ? "Collapse" : "Read More"}
      </button>
    </section>
  );
}

interface PostsProps {
  url: URL;
}

export default function Posts({ url }: PostsProps) {
  const data = readJsonAPI<EntriesListResponse>(url.origin, "entries");
  return (
    <div className="feed">
      {data.map(({ category, slug }) => (
        <React.Suspense fallback={<div />}>
          <Post url={url} category={category} slug={slug} />
        </React.Suspense>
      ))}
    </div>
  );
}
