/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"

import Error404 from "./Error404.tsx"

type LazyPostType = React.LazyExoticComponent<
  ({ slug }: { slug: string }) => React.ReactElement
>;
const Post: LazyPostType = React.lazy(async () =>
  await import("../data/Post.tsx")
);

export default function Article() {
  const { slug } = useParams<'slug'>();
  if (slug === undefined) return <Error404 /> 
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Post slug={slug} />
    </React.Suspense>
  );
}
