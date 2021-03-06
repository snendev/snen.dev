/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../deps/react.ts";
import { Link, Outlet } from "../../../deps/react-router-dom.tsx";

import { Layer } from "../theme.tsx";

import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx";
import ThemeToggle from "./ThemeToggle.tsx";

interface PageProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function Page({ children, sidebar }: PageProps) {
  return (
    <Layer
      className="page"
      headerClassName="header"
      headerTitle={
        <>
          <Link to="/" className="button-link">
            snen.dev
          </Link>
          <span className="theme-toggle-mobile-container">
            <ThemeToggle className="theme-toggle-mobile" />
          </span>
        </>
      }
      headerRight={<Navbar />}
      bodyClassName="main-container"
      root
    >
      <main className="main">
        <div className="body">
          {children}
        </div>
        {sidebar}
      </main>
    </Layer>
  );
}

export default function ParentRoutePage() {
  return (
    <Page sidebar={<Sidebar />}>
      <Outlet />
    </Page>
  );
}
