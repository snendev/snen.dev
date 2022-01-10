import {
  suspendData
} from "../chunk-GVRIBERC.js";
import {
  react_default
} from "../chunk-HZ3YPBUC.js";

// src/client/content/Archive.tsx
function ArchivePage({ url, page }) {
  const archive = suspendData(`api/archive/${page}`, async () => {
    const response = await fetch(`${url.origin}/api/archive/${page}`);
    return await response.json();
  });
  return /* @__PURE__ */ react_default.createElement("div", null, archive.map((i) => /* @__PURE__ */ react_default.createElement("span", {
    key: i,
    onClick: () => console.log(i)
  }, i)));
}
function Archive({ url }) {
  return /* @__PURE__ */ react_default.createElement(react_default.Fragment, null, /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "...")
  }, /* @__PURE__ */ react_default.createElement(ArchivePage, {
    url,
    page: 0
  })), /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "...")
  }, /* @__PURE__ */ react_default.createElement(ArchivePage, {
    url,
    page: 1
  })), /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "...")
  }, /* @__PURE__ */ react_default.createElement(ArchivePage, {
    url,
    page: 2
  })), /* @__PURE__ */ react_default.createElement(react_default.Suspense, {
    fallback: /* @__PURE__ */ react_default.createElement("div", null, "...")
  }, /* @__PURE__ */ react_default.createElement(ArchivePage, {
    url,
    page: 3
  })));
}
export {
  Archive as default
};
//# sourceMappingURL=Archive.js.map
