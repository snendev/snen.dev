/** @jsx React.createElement */
import { React } from "../deps.ts";

type LazyPostsType = React.LazyExoticComponent<({url}: {url: URL}) => React.ReactElement>;
const Posts: LazyPostsType = React.lazy(async () => await import("../content/Posts.tsx"));

interface HomeProps {
  url: URL
}

export default function HomeDirectory({url}: HomeProps) {
  return (
    <div>
      <section>
        <p>
          This website is rendered using React 18's new SSR architecture, without a framework!
        </p>
        <p>
          Concurrent rendering is enabled so that HTML is streamed and hydration is intermittent.
        </p>
        <p>
          TODO: writeup
        </p>
      </section>
      <section>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Posts url={url} />
        </React.Suspense>
      </section>
    </div>
  );
}
