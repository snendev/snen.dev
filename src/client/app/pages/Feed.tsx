/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx";
import type { EntryCategory } from "../../../server/files/types.ts";

import { Layer } from "../theme.tsx";

import Error404 from "./Error404.tsx";

const CATEGORIES: EntryCategory[] = ["about", "reading", "tech", "media"];
function isEntryCategory(category: string): category is EntryCategory {
  return CATEGORIES.includes(category as EntryCategory);
}

type LazyEntryListType = React.LazyExoticComponent<
  ({ feed }: { feed?: EntryCategory }) => React.ReactElement
>;
const EntryList: LazyEntryListType = React.lazy(async () =>
  await import("../data/EntryList.tsx")
);

export default function Feed() {
  const { category } = useParams();
  console.log(category);
  if (category !== undefined && !isEntryCategory(category)) {
    return <Error404 />;
  }
  return (
    <section>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EntryList feed={category} />
      </React.Suspense>
    </section>
  );
}
