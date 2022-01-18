import {
  readJsonAPI
} from "../../chunk-FTNKNGVN.js";
import {
  react_default
} from "../../chunk-SQXXAXP7.js";

// src/client/app/data/Description.tsx
function Description({ slug = "about" }) {
  const entry = readJsonAPI("entries", slug);
  return /* @__PURE__ */ react_default.createElement("p", null, entry.metadata.subhead);
}
export {
  Description as default
};
//# sourceMappingURL=Description.js.map
