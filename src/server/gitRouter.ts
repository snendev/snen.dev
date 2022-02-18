import { Router } from "../deps/oak.ts";

const gitRouter = new Router();

gitRouter.get("/git/(.*)", (context) => {
  const { 0: repoPath } = context.params;

  context.response.redirect(`https://github.com/snendev/${repoPath}`)
});

// TODO automate embedding via codesandbox with a /codesandbox proxy url
// return an HTMLNode with the iframe targeting codesandbox.io/embed

export default gitRouter;
