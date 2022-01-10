var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/client/deps.ts
import React from "https://esm.sh/react@18.0.0-rc.0?pin=v59";
import ReactDOM from "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59";
var init_deps = __esm({
  "src/client/deps.ts"() {
  }
});

// src/client/data/SuspenseRef.ts
var SuspenseRef;
var init_SuspenseRef = __esm({
  "src/client/data/SuspenseRef.ts"() {
    SuspenseRef = class {
      _current;
      constructor(promise) {
        this._current = {
          status: "pending",
          value: promise
        };
        promise.then((value) => {
          if (this._current.status === "pending") {
            this._current = {
              status: "resolved",
              value
            };
          }
        }, (error) => {
          if (this._current.status === "pending") {
            this._current = {
              status: "failure",
              value: error
            };
          }
        });
      }
      read() {
        if (this._current.status === "resolved")
          return this._current.value;
        else
          throw this._current.value;
      }
    };
  }
});

// src/client/data/suspendForData.ts
function suspendForData(key, getAsyncResult) {
  const cachedRef = cache.get(key);
  const ref = cachedRef ?? new SuspenseRef(getAsyncResult());
  if (!cachedRef)
    cache.set(key, ref);
  const result = ref.read();
  return result;
}
var cache;
var init_suspendForData = __esm({
  "src/client/data/suspendForData.ts"() {
    init_SuspenseRef();
    cache = /* @__PURE__ */ new Map();
  }
});

// src/client/content/Posts.tsx
var Posts_exports = {};
__export(Posts_exports, {
  default: () => Posts
});
function Posts({ url }) {
  const text = suspendForData("posts", async () => {
    const response = await fetch("https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts");
    return await response.text();
  });
  return /* @__PURE__ */ React.createElement("p", null, text);
}
var init_Posts = __esm({
  "src/client/content/Posts.tsx"() {
    init_suspendForData();
    init_deps();
  }
});

// src/client/content/Archive.tsx
var Archive_exports = {};
__export(Archive_exports, {
  default: () => Archive
});
function ArchivePage({ url, page, delay }) {
  const archive = suspendForData(`archive${page}`, async () => {
    const response = await fetch(`${url.origin}/api/archive/${page}`);
    return await response.json();
  });
  return /* @__PURE__ */ React.createElement("div", null, archive.map((i) => /* @__PURE__ */ React.createElement("span", {
    key: i,
    onClick: () => console.log(i)
  }, i)));
}
function Archive({ url }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "...")
  }, /* @__PURE__ */ React.createElement(ArchivePage, {
    url,
    page: 0,
    delay: 2
  })), /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "...")
  }, /* @__PURE__ */ React.createElement(ArchivePage, {
    url,
    page: 1,
    delay: 2
  })), /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "...")
  }, /* @__PURE__ */ React.createElement(ArchivePage, {
    url,
    page: 2,
    delay: 6
  })), /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "...")
  }, /* @__PURE__ */ React.createElement(ArchivePage, {
    url,
    page: 3,
    delay: 8
  })));
}
var init_Archive = __esm({
  "src/client/content/Archive.tsx"() {
    init_deps();
    init_suspendForData();
  }
});

// src/client/App.tsx
init_deps();

// src/client/app/Home.tsx
init_deps();
var Posts2 = React.lazy(async () => await Promise.resolve().then(() => (init_Posts(), Posts_exports)));
function HomeDirectory({ url }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("p", null, "This website is rendered using React 18's new SSR architecture, without a framework!"), /* @__PURE__ */ React.createElement("p", null, "Concurrent rendering is enabled so that HTML is streamed and hydration is intermittent."), /* @__PURE__ */ React.createElement("p", null, "TODO: writeup")), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("div", null, "Loading...")
  }, /* @__PURE__ */ React.createElement(Posts2, {
    url
  }))));
}

// src/client/app/Html.tsx
init_deps();
var RESET_STYLE = `
  html, body {
    padding: 0;
    margin: 0;
  }
`;
function Html({ children, entrypoint }) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "shortcut icon",
    href: "favicon.ico"
  }), /* @__PURE__ */ React.createElement("title", null, "Deno React18 Test"), entrypoint, /* @__PURE__ */ React.createElement("style", {
    dangerouslySetInnerHTML: { __html: RESET_STYLE }
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "stylesheet",
    href: "styles.css"
  })), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("noscript", {
    dangerouslySetInnerHTML: {
      __html: `<b>Enable JavaScript to run this app.</b>`
    }
  }), children));
}

// src/client/app/Page.tsx
init_deps();

// src/client/app/GithubIcon.tsx
init_deps();
function GithubIcon({ size = 24 }) {
  return /* @__PURE__ */ React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 1024 1024",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z",
    transform: "scale(64)",
    fill: "#1b1f23"
  }));
}

// src/client/app/Page.tsx
function Page({ children }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "page"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "header"
  }, /* @__PURE__ */ React.createElement("h2", null, "snen.dev's react 18 deno example"), /* @__PURE__ */ React.createElement("nav", {
    className: "navbar"
  }, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/snendev/website"
  }, /* @__PURE__ */ React.createElement(GithubIcon, null)))), /* @__PURE__ */ React.createElement("main", {
    className: "main"
  }, children));
}

// src/client/app/Sidebar.tsx
init_deps();
var Archive2 = React.lazy(async () => await Promise.resolve().then(() => (init_Archive(), Archive_exports)));
function Sidebar({ url }) {
  return /* @__PURE__ */ React.createElement("aside", {
    className: "sidebar"
  }, /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: /* @__PURE__ */ React.createElement("span", null, "...")
  }, /* @__PURE__ */ React.createElement(Archive2, {
    url
  })));
}

// src/client/App.tsx
var HYDRATION_SCRIPT = `
  import React from "https://esm.sh/react@18.0.0-rc.0?pin=v59";
  import ReactDOM from "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59";

  import App from "./App.tsx";

  const url = new URL(window.location.href);

  const root = ReactDOM.hydrateRoot(
    document.body,
    React.createElement(App, {url})
  );
`;
function App({ url }) {
  return /* @__PURE__ */ React.createElement(Html, {
    entrypoint: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("link", {
      rel: "prefetch",
      href: "App.tsx"
    }), /* @__PURE__ */ React.createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: { __html: HYDRATION_SCRIPT }
    }))
  }, /* @__PURE__ */ React.createElement(Page, null, /* @__PURE__ */ React.createElement(Sidebar, {
    url
  }), /* @__PURE__ */ React.createElement(HomeDirectory, {
    url
  })));
}
export {
  App as default
};
