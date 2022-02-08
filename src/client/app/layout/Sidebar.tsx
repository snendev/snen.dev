/** @jsx React.createElement */
import React from "../../../deps/react.ts";

import MediaLinks from "./MediaLinks.tsx";

type LazyComponent = React.LazyExoticComponent<
  () => React.ReactElement
>;
const ArticleDescription: LazyComponent = React.lazy(async () =>
  await import("../data/ArticleDescription.tsx")
);

type LazyArchiveType = React.LazyExoticComponent<
  () => React.ReactElement
>;
const Archive: LazyArchiveType = React.lazy(async () =>
  await import("../data/Archive.tsx")
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <MediaLinks />
      <div className="divider" />
      <section>
        <React.Suspense fallback={<span>...</span>}>
          <ArticleDescription />
        </React.Suspense>
      </section>
      <div className="divider" />
      <section>
        <React.Suspense fallback={<span>...</span>}>
          <Archive />
        </React.Suspense>
      </section>
    </aside>
  );
}
