/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
/// <reference lib="dom" />
import ReactDOMServer from "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59";

import React from "./react.ts";
import App from "./App.tsx";

const url = new URL(window.location.href);

// @ts-ignore No ReactDOMServer@18 types exist yet
const root = ReactDOMServer.hydrateRoot(
  document,
  <App url={url} />,
);
