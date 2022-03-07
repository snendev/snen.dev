import { Router } from "../deps/oak.ts";

// handle static asset requests (ts, js, sourcemaps, css, images, etc)
const staticRouter = new Router();

// rss feed
staticRouter.get("/:path?/(rss|feed|index.xml)", (context) => {
  const { path } = context.params;
  context.response.redirect(`/${path ?? "index"}.xml`);
});

staticRouter.get(
  "/assets/(.+)",
  async (context, next) => {
    const { 0: path } = context.params;
    try {
      await context.send({
        root: `${Deno.cwd()}/assets`,
        path,
      });
    } catch (_error) {
      next();
    }
  },
);

staticRouter.get("/entries/:slug.md", async (context, next) => {
  const { slug } = context.params;
  try {
    await context.send({
      root: `${Deno.cwd()}/dist`,
      path: `${slug}.md`,
    })
  } catch (_error) {
    next();
  }
})

// css|eot|svg|ttf|woff|woff2|xml|md
// any requests that match a file in `/dist` should be served statically
staticRouter.get(
  "/(.+)",
  async (context, next) => {
    const { 0: path } = context.params;
    try {
      console.log(path)
      await context.send({
        root: `${Deno.cwd()}/dist`,
        path,
      });
    } catch (_error) {
      next();
    }
  },
);

export default staticRouter;
