/** @jsx createElement */
import { readerFromStreamReader } from "https://deno.land/std@0.119.0/streams/mod.ts";
import ReactDOMServer from "https://esm.sh/react-dom@18.0.0-rc.0/server?deps=react@18.0.0-rc.0&pin=v59";

import { React } from "../client/deps.ts";

declare global {
  namespace ReactDOMServer {
    export const renderToReadableStream: (
      element: React.ReactElement,
    ) => ReadableStream<Uint8Array>;
  }
}

const defaultBufferSize = 8 * 1024;
const defaultChunkSize = 8 * 1024;

interface RenderOptions {
  bufferSize: number;
  chunkSize: number;
}

export default function render(
  node: React.ReactNode,
  {
    // TODO
    bufferSize = defaultBufferSize,
    chunkSize = defaultChunkSize,
  }: Partial<RenderOptions> = {},
): Deno.Reader {
  // render the tree as a readable stream
  const stream = ReactDOMServer.renderToReadableStream(node);
  // convert to a Reader which handles chunking and streaming
  return readerFromStreamReader(stream.getReader());
}
