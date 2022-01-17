/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import Page from "./page/Page.tsx";

type LazyPostsType = React.LazyExoticComponent<
  ({ url }: { url: URL }) => React.ReactElement
>;
const Posts: LazyPostsType = React.lazy(async () =>
  await import("../content/Posts.tsx")
);

interface HomeProps {
  url: URL;
}

export default function Home({ url }: HomeProps) {
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
      url={url}
    >
      <section>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Posts url={url} />
        </React.Suspense>
      </section>
    </Page>
  );
}
