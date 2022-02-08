/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import type {
  EntryCategory,
  EntriesDetailResponse,
  EntriesListResponse,
} from "../../../server/files/types.ts";

import { Layer, Header, Button } from "../theme.tsx"

import readJsonAPI from "./api/readJsonAPI.ts";

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

  const fullPostHref = `${category === "about" ? "" : `/${category}`}/${slug}`;
  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  const clampedCss = isExpanded || !isPostCollapsibleGuess ? undefined : "clamp-text-3-lines"

  return (
    <Layer className="card">
      <article>
        <Header>
          <a href={fullPostHref}>
            <h3 className="title">
              {entry.metadata.title}
            </h3>
          </a>
        </Header>
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
          <Button
            className="card-button"
            onClick={onClick}
          >
            {isExpanded ? "Collapse" : "Read More"}
          </Button>
        ) : (
          <div className="spacer1em" />
        )}
      </article>
    </Layer>
  );
}

interface PostListProps {
  feed?: EntryCategory
}

export default function PostList({ feed }: PostListProps) {
  const data = readJsonAPI<EntriesListResponse>("feed", feed);
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
