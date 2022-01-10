import { Application, ReactDOMServer } from "./deps.ts";

import React from "../client/react.ts";
import App from "../client/App.tsx";

import staticRouter from "./staticRouter.ts";
import apiRouter from "./apiRouter.ts";

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
function attachLogger<T extends BufferSource>(
  stream: ReadableStream<T>,
): ReadableStream<T> {
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

// handle everything else an app route
app.use(async (context) => {
  const nodeStream = await ReactDOMServer
    .renderToReadableStream(
      <App url={context.request.url} />,
    );
  const stream = Deno.env.get("REACT_SSR_DEBUG")
    ? attachLogger(nodeStream)
    : nodeStream;

  context.response.body = stream;
});

console.log("Listening...");
app.listen(":8080");
