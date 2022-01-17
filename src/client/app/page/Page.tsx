/** @jsx React.createElement */
import React from "../../react.ts";
import { useTheme } from "../../theme.tsx";

import ArchiveFeed from "./ArchiveFeed.tsx";
import MediaLinks from "./MediaLinks.tsx";
import Navbar from "./Navbar.tsx";

interface PageProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  url: URL;
}

export default function Page({ children, sidebarContent, url }: PageProps) {
  const { getClassname } = useTheme();
  const headerCss = getClassname("dark", 2);
  const mainCss = getClassname("dark", 1);
  const bodyCss = getClassname("light", 0);
  return (
    <div className="page">
      <header className={`header ${headerCss}`}>
        <h2>snen.dev</h2>
        <Navbar />
      </header>
      <main className={`main ${mainCss}`}>
        <aside className="sidebar">
          <MediaLinks />
          <div className="divider" />
          <section>
            {sidebarContent}
          </section>
          <div className="divider" />
          <ArchiveFeed url={url} />
        </aside>
        <div className={`body ${bodyCss}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
