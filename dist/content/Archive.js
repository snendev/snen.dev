import {
  readJsonAPI
} from "../chunk-GLDHBVFN.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Archive.tsx
function Archive({ url }) {
  const archive = readJsonAPI(url.origin, "entries");
  return /* @__PURE__ */ react_default.createElement("div", null, archive.map(({ slug }, i) => /* @__PURE__ */ react_default.createElement("div", {
    key: i,
    onClick: () => console.log(slug)
  }, slug)));
}
export {
  Archive as default
};
//# sourceMappingURL=Archive.js.map
