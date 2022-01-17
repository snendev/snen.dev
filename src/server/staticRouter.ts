import { readRSSFeed } from "../files/directory.ts";

import { contentType, Router } from "./deps.ts";
import sleep from "./sleep.ts";

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

// source code and source maps
staticRouter.get("/:path+.(js|jsx|ts|tsx|js)(.map)?", async (context, next) => {
  const { path, 0: _extension, 1: isSourcemap } = context.params;

  const file = await Deno.readTextFile(
    `./dist/${path}.js${isSourcemap ? ".map" : ""}`,
  );

  // await sleep(1);
  if (!file) return await next();

  context.response.type = contentType(".js");
  context.response.body = file;
});

// css and font files
staticRouter.get("/:path.(css|eot|svg|ttf|woff|woff2)", async (context) => {
  const { path, 0: extension } = context.params;
  const file = await Deno.readTextFile(`./public/${path}.${extension}`);

  context.response.type = contentType(".css");
  context.response.body = file;
});

// image/media files
staticRouter.get("/:slug+.:ext", async (context, next) => {
  const { pathname } = context.request.url;
  const path = pathname.slice(1);

  const file = await Deno.readFile(`./assets/${path}`);
  if (!file) return await next();

  context.response.type = contentType(path);
  context.response.body = file;
});

export default staticRouter;
