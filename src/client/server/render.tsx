/** @jsx React.createElement */
import React from "../../deps/react.ts";
import ReactDOMServer from "../../deps/react-dom-server.ts";
import { StaticRouter as ReactStaticRouter } from "../../deps/react-router-dom-server.tsx";

import App from "../App.tsx";

import Html from "./Html.tsx";

declare global {
  namespace ReactDOMServer {
    export const renderToReadableStream: (
      element: React.ReactElement,
    ) => ReadableStream<Uint8Array>;
  }
}

export default async function renderServer(href: URL) {
  const nodeStream = await ReactDOMServer
    .renderToReadableStream(
      <React.StrictMode>
        <Html>
          <ReactStaticRouter location={href}>
            <App />
          </ReactStaticRouter>
        </Html>
      </React.StrictMode>,
    );
  return nodeStream;
}
