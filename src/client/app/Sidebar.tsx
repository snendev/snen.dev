/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";

type LazyArchiveType = React.LazyExoticComponent<({url}: {url: URL}) => React.ReactElement>;
const Archive: LazyArchiveType = React.lazy(async () => await import("../content/Archive.tsx"));

interface SidebarProps {
  url: URL
}

export default function Sidebar({url}: SidebarProps) {
  return (
    <aside className="sidebar">
      <React.Suspense fallback={<span>...</span>}>
        <Archive url={url} />
      </React.Suspense>
    </aside>
  );
}
