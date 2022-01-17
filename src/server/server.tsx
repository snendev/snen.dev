import { Application, ReactDOMServer } from "./deps.ts";

import React from "../client/react.ts";
import App from "../client/App.tsx";

import staticRouter from "./staticRouter.ts";
import apiRouter from "./apiRouter.ts";
import sleep from "./sleep.ts";

declare global {
  namespace ReactDOMServer {
    export const renderToReadableStream: (
      element: React.ReactElement,
    ) => ReadableStream<Uint8Array>;
  }
}

function flushReader(reader: ReadableStreamDefaultReader) {
  async function read() {
    const result = await reader.read();
    console.log(result.value);
    if (!result.done) setTimeout(read);
  }
  setTimeout(read);
}

// tees the Reader stream and pipes through a text decoder
function attachLogger(
  stream: ReadableStream<Uint8Array>,
): ReadableStream<Uint8Array> {
  const [passThroughStream, loggerStream] = stream.tee();
  const reader = loggerStream.pipeThrough(new TextDecoderStream())
    .getReader();
  flushReader(reader);
  return passThroughStream;
}

const app = new Application();

app.use(async (context, next) => {
  try {
    return await next();
  } catch (error) {
    console.error(error);
    context.throw(500);
  }
});

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(staticRouter.routes());
app.use(staticRouter.allowedMethods());

// handle everything else as an app route
app.use(async (context) => {
  const nodeStream = await ReactDOMServer
    .renderToReadableStream(
      <App url={context.request.url} />,
      { bootstrapModules: ["/index.js"] },
    );
  const stream = Deno.env.get("REACT_SSR_DEBUG")
    ? attachLogger(nodeStream)
    : nodeStream;

  context.response.body = stream;
});

console.log("Listening...");
app.listen(":8080");
