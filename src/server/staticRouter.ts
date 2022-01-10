import { Router, contentType } from "./deps.ts";

async function sleep(seconds: number) {
  return await new Promise<void>((resolve) => {
    setTimeout(
      () => { resolve() },
      seconds * 1000,
    )
  })
}

// handle static asset requests (ts, js, sourcemaps, css, images, etc)
const staticRouter = new Router();
staticRouter.get("/:path+.(js|jsx|ts|tsx|js)(.map)?", async (context, next) => {
  const { path, 0: _extension, 1: isSourcemap } = context.params;

  const file = await Deno.readTextFile(
    `./dist/${path}.js${isSourcemap ? ".map" : ""}`,
  );
  await sleep(2);
  if (!file) return await next();

  context.response.type = contentType(".js");
  context.response.body = file;
});

staticRouter.get("/styles.css", async (context) => {
  const file = await Deno.readTextFile("./public/styles.css");

  context.response.type = contentType(".css");
  context.response.body = file;
});

// handle resource/media requests
staticRouter.get("/:slug+.:ext", async (context, next) => {
  const { pathname } = context.request.url;
  const path = pathname.slice(1);

  const file = await Deno.readFile(`./assets/${path}`);
  if (!file) return await next();

  context.response.type = contentType(path);
  context.response.body = file;
});

export default staticRouter;
