import {
  ThemeProvider,
  useTheme
} from "./chunk-3IGTP4YB.js";
import {
  __reExport,
  react_default
} from "./chunk-SQXXAXP7.js";

// src/client/deps/react-router.ts
var react_router_exports = {};
__reExport(react_router_exports, react_router_dom_6_2_1_deps_react_18_0_0_rc_0_react_router_6_2_star);
import * as react_router_dom_6_2_1_deps_react_18_0_0_rc_0_react_router_6_2_star from "https://esm.sh/react-router-dom@6.2.1?deps=react@18.0.0-rc.0,react-router@6.2.1&pin=v63";

// src/client/app/layout/Navbar.tsx
function Navbar() {
  return /* @__PURE__ */ react_default.createElement("nav", {
    className: "navbar"
  }, /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/"
  }, "home"), /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/about"
  }, "about"), /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/read"
  }, "read"), /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/tech"
  }, "tech"), /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/media"
  }, "media"));
}

// src/client/app/layout/MediaLinks.tsx
function Navbar2() {
  return /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement("a", {
    href: "https://twitter.com/snendev",
    target: "_blank"
  }, /* @__PURE__ */ react_default.createElement("div", null, "twitter: @snendev")), /* @__PURE__ */ react_default.createElement("a", {
    href: "https://github.com/snendev",
    target: "_blank"
  }, /* @__PURE__ */ react_default.createElement("div", null, "github: @snendev")), /* @__PURE__ */ react_default.createElement("a", {
    href: "https://twitter.com/snendev",
    target: "_blank"
  }, /* @__PURE__ */ react_default.createElement("div", null, "email: me@snen.dev")), /* @__PURE__ */ react_default.createElement("a", {
    href: "/feed",
    target: "_blank"
  }, /* @__PURE__ */ react_default.createElement("div", null, "rss: https://snen.dev/feed")));
}

// src/client/app/layout/Sidebar.tsx
var Description = react_default.lazy(async () => await import("./app/data/Description.js"));
var Archive = react_default.lazy(async () => await import("./app/data/Archive.js"));
function Sidebar() {
  const { slug } = (0, react_router_exports.useParams)();
  return /* @__PURE__ */ react_default.createElement("aside", {
    className: "sidebar"
  }, /* @__PURE__ */ react_default.createElement(Navbar2, null), /* @__PURE__ */ react_default.createElement("div", {
    className: "divider"
  }), /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("span", null, "...")
  }, /* @__PURE__ */ react_default.createElement(Description, {
    slug
  }))), /* @__PURE__ */ react_default.createElement("div", {
    className: "divider"
  }), /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("span", null, "...")
  }, /* @__PURE__ */ react_default.createElement(Archive, null))));
}

// src/client/app/layout/Page.tsx
function Page() {
  const { getClassname } = useTheme();
  const headerCss = getClassname("dark", 2);
  const bgCss = getClassname("dark", 1);
  const bodyCss = getClassname("light", 0);
  return /* @__PURE__ */ react_default.createElement("div", {
    className: "page"
  }, /* @__PURE__ */ react_default.createElement("header", {
    className: `header ${headerCss}`
  }, /* @__PURE__ */ react_default.createElement("h2", null, "snen.dev"), /* @__PURE__ */ react_default.createElement(Navbar, null)), /* @__PURE__ */ react_default.createElement("div", {
    className: `page-container ${bgCss}`
  }, /* @__PURE__ */ react_default.createElement("main", {
    className: "main"
  }, /* @__PURE__ */ react_default.createElement(Sidebar, null), /* @__PURE__ */ react_default.createElement("section", {
    className: `body ${bodyCss}`
  }, /* @__PURE__ */ react_default.createElement(react_router_exports.Outlet, null)))));
}

// src/client/app/pages/Error404.tsx
function Error404() {
  return /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("p", null, "We can't seem to find the page you're looking for... Sorry!"), /* @__PURE__ */ react_default.createElement("p", null, /* @__PURE__ */ react_default.createElement(react_router_exports.Link, {
    to: "/"
  }, "Go back home")));
}

// src/client/app/pages/Article.tsx
var Post = react_default.lazy(async () => await import("./app/data/Post.js"));
function Article() {
  const { slug } = (0, react_router_exports.useParams)();
  if (slug === void 0)
    return /* @__PURE__ */ react_default.createElement(Error404, null);
  return /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "Loading...")
  }, /* @__PURE__ */ react_default.createElement(Post, {
    slug
  }));
}

// src/client/app/pages/Feed.tsx
var CATEGORIES = ["about", "read", "tech", "media"];
function isEntryCategory(category) {
  return CATEGORIES.includes(category);
}
var PostList = react_default.lazy(async () => await import("./app/data/PostList.js"));
function Feed({ feed }) {
  const { category } = (0, react_router_exports.useParams)();
  if (category === void 0 || !isEntryCategory(category)) {
    return /* @__PURE__ */ react_default.createElement(Error404, null);
  }
  return /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "Loading...")
  }, /* @__PURE__ */ react_default.createElement(PostList, {
    feed: category
  }));
}

// src/client/app/AppRouter.tsx
function AppRouter() {
  return /* @__PURE__ */ react_default.createElement(react_router_exports.Routes, null, /* @__PURE__ */ react_default.createElement(react_router_exports.Route, {
    element: /* @__PURE__ */ react_default.createElement(Page, null)
  }, /* @__PURE__ */ react_default.createElement(react_router_exports.Route, {
    index: true,
    element: /* @__PURE__ */ react_default.createElement(Feed, null)
  }), /* @__PURE__ */ react_default.createElement(react_router_exports.Route, {
    path: ":category"
  }, /* @__PURE__ */ react_default.createElement(react_router_exports.Route, {
    index: true,
    element: /* @__PURE__ */ react_default.createElement(Feed, null)
  }), /* @__PURE__ */ react_default.createElement(react_router_exports.Route, {
    path: ":slug",
    element: /* @__PURE__ */ react_default.createElement(Article, null)
  }))));
}

// src/client/app/Html.tsx
var RESET_STYLE = `
  html, body {
    padding: 0;
    margin: 0;
  }
`;
function Html({ children }) {
  return /* @__PURE__ */ react_default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ react_default.createElement("head", null, /* @__PURE__ */ react_default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ react_default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), /* @__PURE__ */ react_default.createElement("link", {
    rel: "shortcut icon",
    href: "/favicon.ico"
  }), /* @__PURE__ */ react_default.createElement("title", null, "snen.dev"), /* @__PURE__ */ react_default.createElement("style", {
    dangerouslySetInnerHTML: { __html: RESET_STYLE }
  }), /* @__PURE__ */ react_default.createElement("link", {
    rel: "stylesheet",
    href: "/styles.css"
  }), /* @__PURE__ */ react_default.createElement("link", {
    rel: "stylesheet",
    href: "/colors.css"
  })), /* @__PURE__ */ react_default.createElement("body", null, /* @__PURE__ */ react_default.createElement("noscript", {
    dangerouslySetInnerHTML: {
      __html: `<b>Enable JavaScript to run this app.</b>`
    }
  }), children));
}

// src/client/App.tsx
function App() {
  return /* @__PURE__ */ react_default.createElement(Html, null, /* @__PURE__ */ react_default.createElement(ThemeProvider, null, /* @__PURE__ */ react_default.createElement(AppRouter, null)));
}

export {
  react_router_exports,
  App
};
//# sourceMappingURL=chunk-2VJACPRR.js.map
