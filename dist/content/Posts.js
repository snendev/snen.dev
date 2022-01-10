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

// src/client/deps.ts
import React from "https://esm.sh/react@18.0.0-rc.0?pin=v59";
import ReactDOM from "https://esm.sh/react-dom@18.0.0-rc.0?deps=react@18.0.0-rc.0&pin=v59";

// src/client/content/Posts.tsx
function Posts({ url }) {
  const text = suspendForData("posts", async () => {
    const response = await fetch("https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts");
    return await response.text();
  });
  return /* @__PURE__ */ React.createElement("p", null, text);
}
export {
  Posts as default
};
