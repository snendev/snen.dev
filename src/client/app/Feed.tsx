/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";
import { EntryCategory } from "../../files/types.ts"

import Page from "./page/Page.tsx";

type LazyPostListType = React.LazyExoticComponent<
  ({ feed }: { feed?: EntryCategory }) => React.ReactElement
>;
const PostList: LazyPostListType = React.lazy(async () =>
  await import("../content/PostList.tsx")
);

interface FeedProps {
  feed?: EntryCategory
}

export default function Feed({ feed }: FeedProps) {
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
          <PostList feed={feed} />
        </React.Suspense>
      </section>
    </Page>
  );
}
