import { Router, Context } from "../deps/oak.ts";
import { contentType } from "../deps/media-types.ts";

import { readRSSFeed } from "./files/mod.ts";
import sleep from "./sleep.ts";

async function streamFile(context: Context, path: string, contentTypeQuery: string): Promise<void> {
  const fileURL = new URL(`../../${path}`, import.meta.url);
  const response = await fetch(fileURL);
  context.response.type = contentType(contentTypeQuery);
  context.response.body = response.body;
}

// handle static asset requests (ts, js, sourcemaps, css, images, etc)
const staticRouter = new Router();

// rss feed
staticRouter.get("/:path?/(rss|feed|index.xml)", async (context, next) => {
  const { path } = context.params;
  const rss = await readRSSFeed(path);
  if (!rss) return await next()

  context.response.type = contentType(".xml");
  context.response.body = rss;
});

// post content requests
staticRouter.get("/entries/:slug.md", async (context) => {
  const { slug } = context.params;
  await streamFile(context, `entries/${slug}.md`, ".md");
})

// source code and source maps
staticRouter.get("/:path+.(js|jsx|ts|tsx|js)(.map)?", async (context) => {
  const { path, 0: _extension, 1: isSourcemap } = context.params;

  const filepath = `dist/${path}.js${isSourcemap ? ".map" : ""}`;

  // await sleep(1);
  await streamFile(context, filepath, ".js")
});

// css and font files
staticRouter.get("/:path.(css|eot|svg|ttf|woff|woff2)", async (context) => {
  const { path, 0: extension } = context.params;
  const filepath = `public/${path}.${extension}`
  await streamFile(context, filepath, ".css");
});

// image/media files
staticRouter.get("/:slug+.:ext", async (context) => {
  const { pathname } = context.request.url;
  const path = pathname.slice(1)
  const filepath = `assets/${path}`

  await streamFile(context, filepath, path)
});

export default staticRouter;
