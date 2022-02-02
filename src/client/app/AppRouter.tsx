/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../deps/react.ts";
import { Routes, Route } from "../../deps/react-router-dom.tsx"

import Page from "./layout/Page.tsx";
import Article from "./pages/Article.tsx";
import Feed from "./pages/Feed.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Feed />} />
        <Route path=":category">
          <Route index element={<Feed />} />
          <Route path=":slug" element={<Article />} />
        </Route>
      </Route>
    </Routes>
  )
}
