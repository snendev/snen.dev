/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
/// <reference lib="dom" />
import React from "./deps/react.ts";
import ReactDOM from "./deps/react-dom.ts";
import { BrowserRouter } from "./deps/react-router.ts";

import App from "./App.tsx";

// @ts-ignore No ReactDOMServer@18 types exist yet
const root = ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
