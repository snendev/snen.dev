import {
  ThemeProvider,
  useTheme
} from "./chunk-WLUWRX4T.js";
import {
  react_default
} from "./chunk-HZ3YPBUC.js";

// src/client/app/page/ArchiveFeed.tsx
var Archive = react_default.lazy(async () => await import("./content/Archive.js"));
function ArchiveFeed({ url }) {
  return /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("span", null, "...")
  }, /* @__PURE__ */ react_default.createElement(Archive, {
    url
  })));
}

// src/client/app/page/MediaLinks.tsx
function Navbar() {
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

// src/client/app/page/Navbar.tsx
function Navbar2() {
  return /* @__PURE__ */ react_default.createElement("nav", {
    className: "navbar"
  }, /* @__PURE__ */ react_default.createElement("a", {
    href: "/about"
  }, "about"), /* @__PURE__ */ react_default.createElement("a", {
    href: "/read"
  }, "read"), /* @__PURE__ */ react_default.createElement("a", {
    href: "/tech"
  }, "tech"), /* @__PURE__ */ react_default.createElement("a", {
    href: "/media"
  }, "media"));
}

// src/client/app/page/Page.tsx
function Page({ children, sidebarContent, url }) {
  const { getClassname } = useTheme();
  const headerCss = getClassname("dark", 2);
  const bgCss = getClassname("dark", 1);
  const bodyCss = getClassname("light", 0);
  return /* @__PURE__ */ react_default.createElement("div", {
    className: "page"
  }, /* @__PURE__ */ react_default.createElement("header", {
    className: `header ${headerCss}`
  }, /* @__PURE__ */ react_default.createElement("h2", null, "snen.dev"), /* @__PURE__ */ react_default.createElement(Navbar2, null)), /* @__PURE__ */ react_default.createElement("div", {
    className: `main-container ${bgCss}`
  }, /* @__PURE__ */ react_default.createElement("main", {
    className: "main"
  }, /* @__PURE__ */ react_default.createElement("aside", {
    className: "sidebar"
  }, /* @__PURE__ */ react_default.createElement(Navbar, null), /* @__PURE__ */ react_default.createElement("div", {
    className: "divider"
  }), /* @__PURE__ */ react_default.createElement("section", null, sidebarContent), /* @__PURE__ */ react_default.createElement("div", {
    className: "divider"
  }), /* @__PURE__ */ react_default.createElement(ArchiveFeed, {
    url
  })), /* @__PURE__ */ react_default.createElement("div", {
    className: `body ${bodyCss}`
  }, children))));
}

// src/client/app/Router.tsx
var Posts = react_default.lazy(async () => await import("./content/Posts.js"));
function Router({ url }) {
  return /* @__PURE__ */ react_default.createElement(Page, {
    sidebarContent: /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement("p", null, "This website is rendered using React 18's new SSR architecture, without a framework!"), /* @__PURE__ */ react_default.createElement("p", null, "Concurrent rendering is enabled so that HTML is streamed and hydration is intermittent."), /* @__PURE__ */ react_default.createElement("p", null, "TODO: writeup")),
    url
  }, /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "Loading...")
  }, /* @__PURE__ */ react_default.createElement(Posts, {
    url
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
function App({ url }) {
  console.log({ url });
  return /* @__PURE__ */ react_default.createElement(react_default.StrictMode, null, /* @__PURE__ */ react_default.createElement(Html, null, /* @__PURE__ */ react_default.createElement(ThemeProvider, null, /* @__PURE__ */ react_default.createElement(Router, {
    url
  }))));
}

export {
  App
};
//# sourceMappingURL=chunk-IFR4UMRJ.js.map
