/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "./react.ts";

import Home from "./app/Home.tsx";
import Html from "./app/Html.tsx";
import Page from "./app/Page.tsx";
import Sidebar from "./app/Sidebar.tsx";

interface AppProps {
  url: URL;
}

export default function App({ url }: AppProps) {
  console.log({ url });
  return (
    <Html>
      <Page>
        <Sidebar url={url} />
        <Home url={url} />
      </Page>
    </Html>
  );
}
