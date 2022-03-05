/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx";
import type {
  EntryCategory,
  SiteEntryMetadata,
} from "../../../server/files/types.ts";

import { Button } from "../theme.tsx";

import readJsonAPI from "./api/readJsonAPI.ts";
import Card from "./Card.tsx";

type LazyComponent = React.LazyExoticComponent<
  (props: { slug: string; limitSections?: number }) => React.ReactElement
>;
const Markdown: LazyComponent = React.lazy(async () =>
  await import("./Markdown.tsx")
);

interface ReadingCardProps {
  metadata: SiteEntryMetadata;
  to: string;
}

function ReadingCard({ metadata, to }: ReadingCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  function onClick() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <Card
      headerTitle={
        <Link to={to}>
          {metadata.title}
        </Link>
      }
      actionButton={
        <Button
          className="card-button"
          onClick={onClick}
        >
          {isExpanded ? "Collapse" : "Read More"}
        </Button>
      }
    >
      <React.Suspense fallback={<div />}>
        <Markdown
          slug={metadata.slug}
          limitSections={isExpanded ? 8 : 3}
        />
      </React.Suspense>
      {isExpanded
        ? (
          <span>
            <Link to={to}>Read the full post</Link>
          </span>
        )
        : null}
    </Card>
  );
}

interface ShowcaseCardProps {
  metadata: SiteEntryMetadata;
  to: string;
}

function ShowcaseCard({
  metadata,
  to,
}: ShowcaseCardProps): JSX.Element {
  return (
    <Card
      headerTitle={
        <Link to={to}>
          {metadata.title}
        </Link>
      }
      imageSrc={metadata.previewImageSrc}
      imageAlt={`In this post: ${metadata.abstract}`}
    >
      <p>
        {metadata.subhead}
      </p>
    </Card>
  );
}

interface GenericEntryCardProps {
  category: EntryCategory;
  slug: string;
}

export default function GenericEntryCard(
  { category, slug }: GenericEntryCardProps,
) {
  const metadata = readJsonAPI<SiteEntryMetadata>("entries", slug);
  const fullPostHref = `/${category}/${slug}`;

  switch (category) {
    case "about":
    case "reading": {
      return (
        <ReadingCard
          to={fullPostHref}
          metadata={metadata}
        />
      );
    }
    case "media":
    case "tech": {
      return (
        <ShowcaseCard
          to={fullPostHref}
          metadata={metadata}
        />
      );
    }
    default: {
      throw new Error(`Unrecognized category: ${category} - ${slug}`);
    }
  }
}
