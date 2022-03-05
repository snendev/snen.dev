/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../deps/react.ts";
import { Route, Routes } from "../../deps/react-router-dom.tsx";

import DefaultPage from "./layout/Page.tsx";
import Entry from "./pages/Entry.tsx";
import Feed from "./pages/Feed.tsx";

type LazyType = React.LazyExoticComponent<
  () => React.ReactElement
>;
const ThemePlayground: LazyType = React.lazy(async () =>
  await import("./pages/tech/themes/ThemePlayground.tsx")
);

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DefaultPage />}>
        <Route index element={<Feed />} />
        <Route
          path="tech/theme-explorer"
          element={
            <React.Suspense
              fallback={<span>Loading...</span>}
            >
              <ThemePlayground />
            </React.Suspense>
          }
        />
        <Route path=":category">
          <Route index element={<Feed />} />
          <Route path=":slug" element={<Entry />} />
        </Route>
      </Route>
    </Routes>
  );
}
