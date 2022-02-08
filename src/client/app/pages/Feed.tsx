/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"
import type { EntryCategory } from "../../../server/files/types.ts"

import Error404 from "./Error404.tsx"

const CATEGORIES: EntryCategory[] = ["about", "read", "tech", "media"]
function isEntryCategory(category: string): category is EntryCategory {
  return CATEGORIES.includes(category as EntryCategory)
}

type LazyPostListType = React.LazyExoticComponent<
  ({ feed }: { feed?: EntryCategory }) => React.ReactElement
>;
const PostList: LazyPostListType = React.lazy(async () =>
  await import("../data/PostList.tsx")
);

export default function Feed() {
  const { category } = useParams()

  if (category !== undefined && !isEntryCategory(category)) {
    return <Error404 />
  }
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PostList feed={category} />
    </React.Suspense>
  );
}
