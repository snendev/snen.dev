/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";
import { EntryCategory } from "../../files/types.ts"

import Page from "./page/Page.tsx";

type LazyPostType = React.LazyExoticComponent<
  ({ slug }: { slug: string }) => React.ReactElement
>;
const Post: LazyPostType = React.lazy(async () =>
  await import("../content/Post.tsx")
);

interface ArticleProps {
  slug: string
}

export default function Article({ slug }: ArticleProps) {
  return (
    <Page
      sidebarContent={
        <>
          <p>
            This website is rendered using React 18's new SSR architecture,
            without a framework!
          </p>
          <p>
            Concurrent rendering is enabled so that HTML is streamed and
            hydration is intermittent.
          </p>
          <p>
            TODO: writeup
          </p>
        </>
      }
    >
      <section>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Post slug={slug} />
        </React.Suspense>
      </section>
    </Page>
  );
}
