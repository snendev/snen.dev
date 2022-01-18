/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../react.ts";

type LazyArchiveType = React.LazyExoticComponent<
  () => React.ReactElement
>;
const Archive: LazyArchiveType = React.lazy(async () =>
  await import("../../content/Archive.tsx")
);

export default function ArchiveFeed() {
  return (
    <section>
      <React.Suspense fallback={<span>...</span>}>
        <Archive />
      </React.Suspense>
    </section>
  );
}
