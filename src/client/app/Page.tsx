/** @jsx React.createElement */
import React from "../react.ts";

import GithubIcon from "./GithubIcon.tsx";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="page">
      <header className="header">
        <h2>snen.dev's react 18 deno example</h2>
        <nav className="navbar">
          <a href="https://github.com/snendev/website">
            <GithubIcon />
          </a>
        </nav>
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
}
