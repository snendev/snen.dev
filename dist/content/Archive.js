// src/client/deps.ts
import React from "https://esm.sh/react@18.0.0-rc.0?pin=v59";
import ReactDOM from "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59";

// src/client/data/SuspenseRef.ts
var SuspenseRef = class {
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

// src/client/data/suspendForData.ts
var cache = /* @__PURE__ */ new Map();
function suspendForData(key, getAsyncResult) {
  const cachedRef = cache.get(key);
  const ref = cachedRef ?? new SuspenseRef(getAsyncResult());
  if (!cachedRef)
    cache.set(key, ref);
  const result = ref.read();
  return result;
}

// src/client/content/Archive.tsx
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
export {
  Archive as default
};
