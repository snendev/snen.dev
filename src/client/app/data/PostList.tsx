/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx"
import type {
  EntryCategory,
  EntriesDetailResponse,
  EntriesListResponse,
} from "../../../server/files/types.ts";

import { Block, Layer, Button } from "../theme.tsx"

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

  const fullPostHref = `/${category}/${slug}`;
  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  const clampedCss = isExpanded || !isPostCollapsibleGuess ? undefined : "clamp-text-3-lines"

  return (
    <article className="article">
      <Layer
        headerTitle={
          <Link to={fullPostHref}>
            {entry.metadata.title}
          </Link>
        }
        className="card"
      >
        <Block>
          <h4 className={clampedCss}>
            {entry.metadata.subhead}
          </h4>
          <p className={clampedCss}>
            {entry.metadata.abstract}
          </p>
          <span>
            <Link to={fullPostHref}>Read the full post</Link>
          </span>
        </Block>
        <Block>
          {isPostCollapsibleGuess ? (
            <Button
              className="card-button"
              onClick={onClick}
            >
              {isExpanded ? "Collapse" : "Read More"}
            </Button>
          ) : (
            <div />
          )}
        </Block>
      </Layer>
    </article>
  );
}

interface PostListProps {
  feed?: EntryCategory
}

export default function PostList({ feed }: PostListProps) {
  const data = readJsonAPI<EntriesListResponse>("feed", feed);
  return (
    <div>
      {data.map(({ category, slug }) => (
        <Block key={slug}>
          <React.Suspense fallback={<div />}>
            <Card category={category} slug={slug} />
          </React.Suspense>
        </Block>
      ))}
    </div>
  );
}
