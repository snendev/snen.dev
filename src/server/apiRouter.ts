import { Router, contentType } from "./deps.ts";
import loadEntries from "./loadEntries.ts"
import type { EntriesListResponse, EntriesDetailResponse } from "./apiTypes.ts"

const siteEntries = await loadEntries("./entries");

const apiRouter = new Router();

apiRouter.get("/api/entries", (context) => {
  context.response.type = contentType(".json");
  const entries: EntriesListResponse = Object.values(siteEntries)
    .sort((a, b) => {
      const value = a.modifyDate.valueOf() - b.modifyDate.valueOf();
      return Math.abs(value);
    })
  context.response.body = JSON.stringify(entries);
});

apiRouter.get("/api/entries/:slug", async (context) => {
  const { slug } = context.params;

  const text = await Deno.readTextFile(`./entries/${slug}.md`);
  const metadata = siteEntries[slug]

  const data: EntriesDetailResponse = {
    content: text,
    metadata,
  };
  context.response.type = contentType(".json");
  context.response.body = JSON.stringify(data);
});

export default apiRouter;
