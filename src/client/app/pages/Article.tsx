/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";

type LazyPostType = React.LazyExoticComponent<
  () => React.ReactElement
>;
const ArticleContent: LazyPostType = React.lazy(async () =>
  await import("../data/ArticleContent.tsx")
);

export default function Article() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ArticleContent />
    </React.Suspense>
  );
}
