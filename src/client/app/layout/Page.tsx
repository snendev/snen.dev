/** @jsx React.createElement */
import React from "../../../deps/react.ts";
import { Outlet } from "../../../deps/react-router-dom.tsx"

import { Layer, Header } from "../theme.tsx";

import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx"

export default function Page() {
  return (
    <div className="page">
      <Header>
        <h2>snen.dev</h2>
        <Navbar />
      </Header>
      <Layer className="page-container">
        <main className="main">
          <Sidebar />
          <Layer className="body">
            <section>
              <Outlet />
            </section>
          </Layer>
        </main>
      </Layer>
    </div>
  );
}
