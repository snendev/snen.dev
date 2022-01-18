import {
  useTheme
} from "../chunk-WLUWRX4T.js";
import {
  readJsonAPI
} from "../chunk-VWDSX3SW.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Post.tsx
function Post({ slug }) {
  const entry = readJsonAPI("entries", slug);
  const { getClassname } = useTheme();
  const titleCss = getClassname("dark", 2);
  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  console.log({ entry, isPostCollapsibleGuess });
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
