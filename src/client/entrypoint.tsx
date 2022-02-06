/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
/// <reference lib="dom" />
import React from "../deps/react.ts";
import ReactDOM from "../deps/react-dom.ts";
import { BrowserRouter } from "../deps/react-router-dom.tsx";

import App from "./App.tsx";

const root = ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
