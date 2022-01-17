import {
  useTheme
} from "../chunk-WLUWRX4T.js";
import {
  readJsonAPI
} from "../chunk-GLDHBVFN.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Posts.tsx
function Post({ url, category, slug }) {
  const entry = readJsonAPI(url.origin, "entries", slug);
  const [isExpanded, setIsExpanded] = react_default.useState(false);
  function onClick() {
    setIsExpanded((prev) => !prev);
  }
  const { getClassname } = useTheme();
  const cardCss = getClassname("surface", 0);
  const cardHeaderCss = getClassname("dark", 2);
  const fullPostHref = `${category === "about" ? "" : `/${category}`}/${slug}`;
  return /* @__PURE__ */ react_default.createElement("section", {
    className: `card ${cardCss}`
  }, /* @__PURE__ */ react_default.createElement("a", {
    href: fullPostHref
  }, /* @__PURE__ */ react_default.createElement("div", {
    className: cardHeaderCss
  }, entry.metadata.title)), /* @__PURE__ */ react_default.createElement("div", {
    dangerouslySetInnerHTML: { __html: entry.content }
  }), /* @__PURE__ */ react_default.createElement("button", {
    className: "card-expander",
    onClick
  }, isExpanded ? "Collapse" : "Read More"));
}
function Posts({ url }) {
  const data = readJsonAPI(url.origin, "entries");
  return /* @__PURE__ */ react_default.createElement("div", {
    className: "feed"
  }, data.map(({ category, slug }) => /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null)
  }, /* @__PURE__ */ react_default.createElement(Post, {
    url,
    category,
    slug
  }))));
}
export {
  Posts as default
};
//# sourceMappingURL=Posts.js.map
