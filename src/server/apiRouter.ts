import { Router } from "../deps/oak.ts";
import { contentType } from "../deps/media-types.ts";

import { getEntryMetadata, readDirectory } from "./files/mod.ts";

const apiRouter = new Router();

apiRouter.get("/api/(entries|feed)", (context) => {
  context.response.type = contentType(".json");
  const entries = readDirectory();
  context.response.body = JSON.stringify(entries);
});

apiRouter.get("/api/feed/:slug", (context) => {
  const { slug } = context.params;

  context.response.type = contentType(".json");
  const entries = readDirectory(slug);
  context.response.body = JSON.stringify(entries);
});

apiRouter.get("/api/entries/:slug", async (context) => {
  const { slug } = context.params;

  const data = await getEntryMetadata(slug);
  context.response.type = contentType(".json");
  context.response.body = JSON.stringify(data);
});

export default apiRouter;
