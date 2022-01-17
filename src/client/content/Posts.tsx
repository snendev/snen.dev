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
  const cardButtonCss = getClassname("primary", 2);

  const fullPostHref = `${category === "about" ? "" : `/${category}`}/${slug}`;
  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  const clampedCss = isExpanded || !isPostCollapsibleGuess ? undefined : "clamp-text-3-lines"
  console.log({entry, isPostCollapsibleGuess})
  return (
    <section className={`card ${cardCss}`}>
      <a href={fullPostHref}>
        <div className={`card-header ${cardHeaderCss}`}>
          <h3 className="card-title">
            {entry.metadata.title}
          </h3>
        </div>
      </a>
      <h4 className={clampedCss}>
        {entry.metadata.subhead}
      </h4>
      <p className={clampedCss}>
        {entry.metadata.abstract}
      </p>
      <span>
        <a href={fullPostHref}>Read the full post</a>
      </span>
      {isPostCollapsibleGuess ? (
        <button
          className={`card-button ${cardButtonCss}`}
          onClick={onClick}
        >
          {isExpanded ? "Collapse" : "Read More"}
        </button>
      ) : (
        <div className="spacer1em" />
      )}
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
