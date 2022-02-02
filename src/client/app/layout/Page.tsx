/** @jsx React.createElement */
import React from "../../../deps/react.ts";
import { Outlet } from "../../../deps/react-router-dom.tsx"

import { useTheme } from "../../theme.tsx";

import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx"

export default function Page() {
  const { getClassname } = useTheme();
  const headerCss = getClassname("dark", 2);
  const bgCss = getClassname("dark", 1);
  const bodyCss = getClassname("light", 0);
  return (
    <div className="page">
      <header className={`header ${headerCss}`}>
        <h2>snen.dev</h2>
        <Navbar />
      </header>
      <div className={`page-container ${bgCss}`}>
        <main className="main">
          <Sidebar />
          <section className={`body ${bodyCss}`}>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}
