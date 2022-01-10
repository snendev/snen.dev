/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "./deps.ts";

import Home from "./app/Home.tsx";
import Html from "./app/Html.tsx";
import Page from "./app/Page.tsx";
import Sidebar from "./app/Sidebar.tsx"

const HYDRATION_SCRIPT = `
  import React from \"https://esm.sh/react@18.0.0-rc.0?pin=v59\";
  import { hydrateRoot } from \"https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59\";

  import App from "./App.tsx";

  const url = new URL(window.location.href);
  function Wrapper() {
    const r = React.useRef();
    console.log(r)
    return <App url={url} />;
  }
  const root = hydrateRoot(
    document.body,
    React.createElement(Wrapper)
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
          <link rel="prefetch" href="App.tsx" />
          <link rel="prefetch" href="deps.ts" />
          <script
            type="module"
            dangerouslySetInnerHTML={{ __html: HYDRATION_SCRIPT }}
          />
        </>
      }
    >
      <Page>
        <Sidebar url={url} />
        <Home url={url} />
      </Page>
    </Html>
  );
}
