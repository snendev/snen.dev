import {
  readJsonAPI
} from "../../chunk-FTNKNGVN.js";
import {
  react_default
} from "../../chunk-SQXXAXP7.js";

// src/client/app/data/Archive.tsx
function Archive() {
  const archive = readJsonAPI("entries");
  return /* @__PURE__ */ react_default.createElement("div", null, archive.map(({ title, category }, i) => /* @__PURE__ */ react_default.createElement("div", {
    key: i,
    onClick: () => console.log(title)
  }, /* @__PURE__ */ react_default.createElement("h5", null, title), /* @__PURE__ */ react_default.createElement("span", null, category))));
}
export {
  Archive as default
};
//# sourceMappingURL=Archive.js.map
