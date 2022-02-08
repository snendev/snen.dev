import { Router } from "../deps/oak.ts";

const gitRouter = new Router();

gitRouter.get("/git/:repo?", (context) => {
  const { repo } = context.params;

  context.response.redirect(`https://github.com/snendev/${repo}`)
});

export default gitRouter;
