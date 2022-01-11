import {
  readJsonAPI,
  suspendData
} from "../chunk-VJTBR7HI.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Posts.tsx
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
function Post({ url, slug }) {
  const entry = readJsonAPI(url.origin, "entries", slug);
  const html = suspendData(`parse-markdown/${slug}`, () => new Promise((resolve) => {
    const result = Marked.parse(entry.content);
    resolve(result.content);
  }));
  const [counter, setCounter] = react_default.useState(0);
  function onClick() {
    setCounter((prev) => prev + 1);
  }
  return /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("div", null, counter, /* @__PURE__ */ react_default.createElement("button", {
    onClick
  }, "+")), /* @__PURE__ */ react_default.createElement("div", {
    dangerouslySetInnerHTML: { __html: html }
  }));
}
function Posts({ url }) {
  const data = readJsonAPI(url.origin, "entries");
  return /* @__PURE__ */ react_default.createElement("div", null, data.map(({ slug }) => /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null)
  }, /* @__PURE__ */ react_default.createElement(Post, {
    url,
    slug
  }))));
}
export {
  Posts as default
};
//# sourceMappingURL=Posts.js.map
