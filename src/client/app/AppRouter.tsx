/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../deps/react.ts";
import { Routes, Route } from "../../deps/react-router-dom.tsx"

import DefaultPage, { Page as BarePage } from "./layout/Page.tsx";
import Article from "./pages/Article.tsx";
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
      <Route
        path="/theme-explorer"
        element={
          <React.Suspense
            fallback={
              <BarePage>
                <span>Loading...</span>
              </BarePage>
            }
          >
            <ThemePlayground />
          </React.Suspense>
        }
      />
      <Route path="/" element={<DefaultPage />}>
        <Route index element={<Feed />} />
        <Route path=":category">
          <Route index element={<Feed />} />
          <Route path=":slug" element={<Article />} />
        </Route>
      </Route>
    </Routes>
  )
}
