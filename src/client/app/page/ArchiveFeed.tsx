/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../react.ts";

type LazyArchiveType = React.LazyExoticComponent<
  ({ url }: { url: URL }) => React.ReactElement
>;
const Archive: LazyArchiveType = React.lazy(async () =>
  await import("../../content/Archive.tsx")
);

interface ArchiveFeedProps {
  url: URL;
}

export default function ArchiveFeed({ url }: ArchiveFeedProps) {
  return (
    <section>
      <React.Suspense fallback={<span>...</span>}>
        <Archive url={url} />
      </React.Suspense>
    </section>
  );
}
