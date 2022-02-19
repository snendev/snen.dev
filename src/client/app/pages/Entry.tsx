/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { useParams } from "../../../deps/react-router-dom.tsx"

import ArticleContent from "../data/ArticleContent.tsx"
import ItchIOShowcase from "../data/ItchIOShowcase.tsx"
import { Block } from "../theme.tsx"

export default function Entry() {
  const { category, slug } = useParams()

  if (!slug) {
    return (
      <section />
    )
  }
  if (category === "media") {
    return (
      <Block>
        <section>
          <React.Suspense fallback={<div />}>
            <ItchIOShowcase slug={slug} />
          </React.Suspense>
        </section>
      </Block>
    )
  }
  return (
    <Block>
      <section>
        <React.Suspense fallback={<div />}>
          <ArticleContent slug={slug} />
        </React.Suspense>
      </section>
    </Block>
  );
}
