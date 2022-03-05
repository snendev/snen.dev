import { Router } from "../deps/oak.ts";

const gitRouter = new Router();

// redirect to repo homepage
gitRouter.get("/git/:repo", (context) => {
  const { repo } = context.params;

  context.response.redirect(`https://github.com/snendev/${repo}`);
});

// redirect to a specific branch page
gitRouter.get("/git/:repo/:branch", (context) => {
  const { repo, branch } = context.params;

  context.response.redirect(
    `https://github.com/snendev/${repo}/tree/${branch}`,
  );
});

// redirect to some specific file location
gitRouter.get("/git/:repo/(.*)", (context) => {
  const { repo, 0: codePath } = context.params;

  context.response.redirect(`https://github.com/snendev/${repo}/${codePath}`);
});

// TODO automate embedding via codesandbox with a /codesandbox proxy url
// return an HTMLNode with the iframe targeting codesandbox.io/embed

export default gitRouter;
