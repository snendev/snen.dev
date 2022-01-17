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

// src/client/data/suspendData.ts
var _globalCache = /* @__PURE__ */ new Map();
function getCache() {
  return _globalCache;
}
function suspendData(key, getAsyncResult) {
  const cache = getCache();
  const cachedRef = cache.get(key);
  const ref = cachedRef ?? new SuspenseRef(getAsyncResult());
  if (!cachedRef)
    cache.set(key, ref);
  const result = ref.read();
  return result;
}

// src/client/data/readJsonAPI.ts
function readJsonAPI(origin, endpoint, specifier) {
  const pathname = `api/${endpoint}${specifier ? `/${specifier}` : ""}`;
  return suspendData(pathname, async () => {
    const response = await fetch(`${origin}/${pathname}`);
    return await response.json();
  });
}

export {
  readJsonAPI
};
//# sourceMappingURL=chunk-GLDHBVFN.js.map
