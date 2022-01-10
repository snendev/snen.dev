import {
  suspendData
} from "../chunk-GVRIBERC.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Posts.tsx
function Posts({ url }) {
  const text = suspendData("api/posts", async () => {
    const response = await fetch("https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts");
    return await response.text();
  });
  return /* @__PURE__ */ react_default.createElement("p", null, text);
}
export {
  Posts as default
};
//# sourceMappingURL=Posts.js.map
