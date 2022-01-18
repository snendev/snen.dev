import {
  useTheme
} from "../../chunk-3IGTP4YB.js";
import {
  readJsonAPI
} from "../../chunk-FTNKNGVN.js";
import {
  react_default
} from "../../chunk-SQXXAXP7.js";

// src/client/app/data/PostList.tsx
function Card({ category, slug }) {
  const entry = readJsonAPI("entries", slug);
  const [isExpanded, setIsExpanded] = react_default.useState(false);
  function onClick() {
    setIsExpanded((prev) => !prev);
  }
  const { getClassname } = useTheme();
  const cardCss = getClassname("surface", 0);
  const cardHeaderCss = getClassname("dark", 2);
  const cardButtonCss = getClassname("primary", 2);
  const fullPostHref = `${category === "about" ? "" : `/${category}`}/${slug}`;
  const isPostCollapsibleGuess = entry.metadata.abstract.length > 400;
  const clampedCss = isExpanded || !isPostCollapsibleGuess ? void 0 : "clamp-text-3-lines";
  return /* @__PURE__ */ react_default.createElement("article", {
    className: `card ${cardCss}`
  }, /* @__PURE__ */ react_default.createElement("a", {
    href: fullPostHref
  }, /* @__PURE__ */ react_default.createElement("h3", {
    className: `title ${cardHeaderCss}`
  }, entry.metadata.title)), /* @__PURE__ */ react_default.createElement("h4", {
    className: clampedCss
  }, entry.metadata.subhead), /* @__PURE__ */ react_default.createElement("p", {
    className: clampedCss
  }, entry.metadata.abstract), /* @__PURE__ */ react_default.createElement("span", null, /* @__PURE__ */ react_default.createElement("a", {
    href: fullPostHref
  }, "Read the full post")), isPostCollapsibleGuess ? /* @__PURE__ */ react_default.createElement("button", {
    className: `card-button ${cardButtonCss}`,
    onClick
  }, isExpanded ? "Collapse" : "Read More") : /* @__PURE__ */ react_default.createElement("div", {
    className: "spacer1em"
  }));
}
function PostList({ feed }) {
  const data = readJsonAPI("entries");
  return /* @__PURE__ */ react_default.createElement("div", {
    className: "feed"
  }, data.map(({ category, slug }) => /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null)
  }, /* @__PURE__ */ react_default.createElement(Card, {
    category,
    slug
  }))));
}
export {
  PostList as default
};
//# sourceMappingURL=PostList.js.map
