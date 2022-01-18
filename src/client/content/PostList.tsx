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

interface CardProps {
  category: EntryCategory;
  slug: string;
}

function Card({ category, slug }: CardProps) {
  const entry = readJsonAPI<EntriesDetailResponse>("entries", slug);
  // const html = Marked.parse(entry.content).content;

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

  return (
    <article className={`card ${cardCss}`}>
      <a href={fullPostHref}>
        <h3 className={`title ${cardHeaderCss}`}>
          {entry.metadata.title}
        </h3>
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
    </article>
  );
}

interface PostListProps {
  feed?: EntryCategory
}

export default function PostList({ feed }: PostListProps) {
  const data = readJsonAPI<EntriesListResponse>("entries");
  return (
    <div className="feed">
      {data.map(({ category, slug }) => (
        <React.Suspense fallback={<div />}>
          <Card category={category} slug={slug} />
        </React.Suspense>
      ))}
    </div>
  );
}
