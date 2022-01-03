/** @jsx createElement */
/** @jsxFrag Fragment */
import { createElement, Fragment, lazy, Suspense } from "react";

import Html from "./Html.tsx";
import Page from "./page/Page.tsx";

const Comments: any = lazy(() => import("./content/Posts.tsx"));

const HYDRATION_SCRIPT = `
  import React from \"https://esm.sh/react@rc?target=deno&pin=v59\";
  import { hydrateRoot } from \"https://esm.sh/react-dom@rc?no-check&deps=react@rc&pin=v59\";

  import App from "./App.tsx";

  const root = hydrateRoot(
    document.body,
    React.createElement(App, { url: new URL(window.location.href) })
  );
`;

interface AppProps {
  url: URL;
}

export default function App({ url }: AppProps) {
  return (
    <Html
      entrypoint={
        // Include link as quick attempt to mimic webpack-prefetch
        // https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
        <>
          <link rel="prefetch" href="App.tsx" />;
          <script
            type="module"
            dangerouslySetInnerHTML={{ __html: HYDRATION_SCRIPT }}
          />
        </>
      }
    >
      <Page>
        <Suspense fallback={<div>Loading...</div>}>
          <Comments />
        </Suspense>
      </Page>
    </Html>
  );
}
