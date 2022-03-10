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

// TODO (unsupported?) pass SHA through github action
const GIT_SHA = Deno.env.get("GIT_SHA") ?? "main";

gitRouter.get("/codesandbox-embed/:repo/(.*)", (context) => {
  const { repo, 0: codePath } = context.params;
  context.response.redirect(
    `https://codesandbox.io/embed/github/snendev/${repo}/tree/${GIT_SHA}?autoresize=1&view=editor&codemirror=1&fontsize=12&module=/${codePath}`
  )
})

export default gitRouter;
