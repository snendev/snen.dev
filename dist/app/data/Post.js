import {
  useTheme
} from "../../chunk-3IGTP4YB.js";
import {
  readJsonAPI
} from "../../chunk-FTNKNGVN.js";
import {
  react_default
} from "../../chunk-SQXXAXP7.js";

// src/client/app/data/Post.tsx
function Post({ slug }) {
  const entry = readJsonAPI("entries", slug);
  const { getClassname } = useTheme();
  const titleCss = getClassname("dark", 2);
  return /* @__PURE__ */ react_default.createElement("article", null, /* @__PURE__ */ react_default.createElement("h3", {
    className: `title ${titleCss}`
  }, entry.metadata.title), /* @__PURE__ */ react_default.createElement("div", {
    dangerouslySetInnerHTML: { __html: entry.content }
  }));
}
export {
  Post as default
};
//# sourceMappingURL=Post.js.map
