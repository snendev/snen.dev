import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.11.1/mod.ts";

import { React } from "../client/deps.ts"; 
import App from "../client/App.tsx";

import render from "./render.tsx";

const app = new Application();
const router = new Router();

const PAGE_SIZE = 4;

const FIRST_FIFTY_INTS = Array(50).fill(0).map((_, i) => i);

// handle api requests
router.get('/api/archive/:page', (context) => {
  const { page } = context.params;

  const pageNumber = +(page ?? 0);
  if (Number.isNaN(pageNumber)) {
    context.response.status = 400;
    context.response.body = "Bad Request";
  }

  const startValue = pageNumber * PAGE_SIZE;
  const numbers = FIRST_FIFTY_INTS.slice(startValue, startValue + PAGE_SIZE);

  context.response.type = contentType(".json");
  context.response.body = JSON.stringify(numbers);
})

// router.get('/api/content/:page?', (context) => {
//   const { page } = context.params;

//   const startIndex = (page ? +page : 0) * PAGE_SIZE;

//   context.response.type = contentType(".json");
//   context.response.body = JSON.stringify(FIRST_FIFTY_INTS.slice(startIndex, startIndex + PAGE_SIZE));
// })

// handle ts/js requests
router.get("/:path+.(js|jsx|ts|tsx)", async (context, next) => {
  const { path } = context.params;

  const file = await Deno.readTextFile(`./dist/${path}.js`);
  if (!file) return await next();

  context.response.type = contentType(".js");
  context.response.body = file;
});

router.get("/styles.css", async (context, next) => {
  const file = await Deno.readTextFile("./public/styles.css");

  context.response.type = contentType(".css");
  context.response.body = file;
})

// handle resource/media requests
router.get("/:slug+.:ext", async (context, next) => {
  const { pathname } = context.request.url;
  const path = pathname.slice(1);

  const file = await Deno.readFile(`./assets/${path}`);
  if (!file) return await next();

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
