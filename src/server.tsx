import React from "react";
import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.11.1/mod.ts";

import App from "./App.tsx";
import render from "./render.tsx";

const JS_DELAY = 100;
const RESOURCE_DELAY = 700;

async function sleep(delay: number) {
  return await new Promise((resolve) => setTimeout(resolve, delay));
}

const app = new Application();
const router = new Router();

// handle api requests
// router.get('/api/:slug+', async (context, next) => {
//   return await next()
// })

// handle ts/js requests
router.get("/:path+.(js|jsx|ts|tsx)", async (context, next) => {
  const { path } = context.params;

  const file = await Deno.readTextFile(`./dist/${path}.js`);
  if (!file) return await next();

  await sleep(JS_DELAY);
  context.response.type = contentType(".js");
  context.response.body = file;
});

// handle resource/media requests
router.get("/:slug+.:ext", async (context, next) => {
  const { pathname } = context.request.url;
  const path = pathname.slice(1);

  const file = await Deno.readFile(`./assets/${path}`);
  if (!file) return await next();

  await sleep(RESOURCE_DELAY);
  context.response.type = contentType(path);
  context.response.body = file;
});

// handle else (everything without an extension) as app routes
router.get("/(.*)", async (context) => {
  context.response.body = await render(
    <App url={context.request.url} />,
  );
});

app.use(async (context, next) => {
  try {
    return await next();
  } catch (error) {
    console.error(error);
    context.throw(500);
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening...");
app.listen(":8080");
