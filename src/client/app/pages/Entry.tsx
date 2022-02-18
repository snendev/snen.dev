/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"

import ArticleContent from "../data/ArticleContent.tsx"
import ItchIOShowcase from "../data/ItchIOShowcase.tsx"

export default function Entry() {
  const { category, slug } = useParams()

  if (!slug) {
    return (
      <section />
    )
  }
  if (category === "media") {
    return (
      <section>
        <React.Suspense fallback={<div />}>
          <ItchIOShowcase slug={slug} />
        </React.Suspense>
      </section>
    )
  }
  return (
    <section>
      <ArticleContent slug={slug} />
    </section>
  );
}
