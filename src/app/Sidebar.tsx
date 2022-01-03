/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";

const Archive: any = React.lazy(() => import("../content/Archive.tsx"));

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
