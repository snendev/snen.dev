import {
  suspendData
} from "../chunk-GVRIBERC.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Posts.tsx
function Posts({ url }) {
  const data = suspendData("api/posts", async () => {
    const response = await fetch(`${url.origin}/api/posts`);
    return await response.json();
  });
  const [counter, setCounter] = react_default.useState(0);
  function onClick() {
    setCounter((prev) => prev + 1);
  }
  return /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("div", null, counter, /* @__PURE__ */ react_default.createElement("button", {
    onClick
  }, "+")), data.map(({ title, text }) => /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("h2", null, title), /* @__PURE__ */ react_default.createElement("p", null, text))));
}
export {
  Posts as default
};
//# sourceMappingURL=Posts.js.map
