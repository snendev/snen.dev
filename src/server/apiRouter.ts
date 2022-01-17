import { readDirectory, readFile } from "../files/directory.ts";

import { contentType, Router } from "./deps.ts";

const apiRouter = new Router();

apiRouter.get("/api/entries", (context) => {
  context.response.type = contentType(".json");
  const entries = readDirectory();
  context.response.body = JSON.stringify(entries);
});

apiRouter.get("/api/entries/:slug", async (context) => {
  const { slug } = context.params;

  const data = await readFile(slug);
  context.response.type = contentType(".json");
  context.response.body = JSON.stringify(data);
});

export default apiRouter;
