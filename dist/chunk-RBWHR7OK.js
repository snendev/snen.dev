import {
  react_default
} from "./chunk-HZ3YPBUC.js";

// src/client/app/Home.tsx
var Posts = react_default.lazy(async () => await import("./content/Posts.js"));
function HomeDirectory({ url }) {
  return /* @__PURE__ */ react_default.createElement("div", null, /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement("p", null, "This website is rendered using React 18's new SSR architecture, without a framework!"), /* @__PURE__ */ react_default.createElement("p", null, "Concurrent rendering is enabled so that HTML is streamed and hydration is intermittent."), /* @__PURE__ */ react_default.createElement("p", null, "TODO: writeup")), /* @__PURE__ */ react_default.createElement("section", null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
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
    href: "favicon.ico"
  }), /* @__PURE__ */ react_default.createElement("title", null, "Deno React18 Test"), /* @__PURE__ */ react_default.createElement("style", {
    dangerouslySetInnerHTML: { __html: RESET_STYLE }
  }), /* @__PURE__ */ react_default.createElement("script", {
    type: "module",
    src: "./index.js"
  }), /* @__PURE__ */ react_default.createElement("link", {
    rel: "stylesheet",
    href: "styles.css"
  })), /* @__PURE__ */ react_default.createElement("body", null, /* @__PURE__ */ react_default.createElement("noscript", {
    dangerouslySetInnerHTML: {
      __html: `<b>Enable JavaScript to run this app.</b>`
    }
  }), children));
}

// src/client/app/GithubIcon.tsx
function GithubIcon({ size = 24 }) {
  return /* @__PURE__ */ react_default.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 1024 1024",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ react_default.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z",
    transform: "scale(64)",
    fill: "#1b1f23"
  }));
}

// src/client/app/Page.tsx
function Page({ children }) {
  return /* @__PURE__ */ react_default.createElement("div", {
    className: "page"
  }, /* @__PURE__ */ react_default.createElement("header", {
    className: "header"
  }, /* @__PURE__ */ react_default.createElement("h2", null, "snen.dev's react 18 deno example"), /* @__PURE__ */ react_default.createElement("nav", {
    className: "navbar"
  }, /* @__PURE__ */ react_default.createElement("a", {
    href: "https://github.com/snendev/website"
  }, /* @__PURE__ */ react_default.createElement(GithubIcon, null)))), /* @__PURE__ */ react_default.createElement("main", {
    className: "main"
  }, children));
}

// src/client/app/Sidebar.tsx
var Archive = react_default.lazy(async () => await import("./content/Archive.js"));
function Sidebar({ url }) {
  return /* @__PURE__ */ react_default.createElement("aside", {
    className: "sidebar"
  }, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("span", null, "...")
  }, /* @__PURE__ */ react_default.createElement(Archive, {
    url
  })));
}

// src/client/App.tsx
function App({ url }) {
  console.log({ url });
  return /* @__PURE__ */ react_default.createElement(Html, null, /* @__PURE__ */ react_default.createElement(Page, null, /* @__PURE__ */ react_default.createElement(Sidebar, {
    url
  }), /* @__PURE__ */ react_default.createElement(HomeDirectory, {
    url
  })));
}

export {
  App
};
//# sourceMappingURL=chunk-RBWHR7OK.js.map
