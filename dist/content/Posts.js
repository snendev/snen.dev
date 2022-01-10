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
  const [counter, setCounter] = react_default.useState(0);
  function onClick() {
    setCounter((prev) => prev + 1);
  }
  return /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("div", null, counter, /* @__PURE__ */ react_default.createElement("button", {
    onClick
  }, "+")), /* @__PURE__ */ react_default.createElement("p", null, text));
}
export {
  Posts as default
};
//# sourceMappingURL=Posts.js.map
