/** @jsx React.createElement */
import React from "../../deps/react.ts";
import { useParams } from "../../deps/react-router.ts"

import MediaLinks from "./MediaLinks.tsx";

type LazyDescriptionType = React.LazyExoticComponent<
  ({ slug }: { slug?: string }) => React.ReactElement
>;
const Description: LazyDescriptionType = React.lazy(async () =>
  await import("../data/Description.tsx")
);

type LazyArchiveType = React.LazyExoticComponent<
  () => React.ReactElement
>;
const Archive: LazyArchiveType = React.lazy(async () =>
  await import("../data/Archive.tsx")
);

export default function Sidebar() {
  const { slug } = useParams()
  return (
    <aside className="sidebar">
      <MediaLinks />
      <div className="divider" />
      <section>
        <React.Suspense fallback={<span>...</span>}>
          <Description slug={slug} />
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
