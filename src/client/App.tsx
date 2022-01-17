/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "./react.ts";

import Home from "./app/Home.tsx";
import Html from "./app/Html.tsx";
import { ThemeProvider } from "./theme.tsx";

interface AppProps {
  url: URL;
}

export default function App({ url }: AppProps) {
  console.log({ url });
  return (
    <React.StrictMode>
      <Html>
        <ThemeProvider>
          <Home url={url} />
        </ThemeProvider>
      </Html>
    </React.StrictMode>
  );
}
