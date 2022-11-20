import type { VNode } from "preact";

import GithubIcon from "./GithubIcon.tsx";

interface PageProps {
  children: VNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="flex flex-col justify-start items-center w-full h-full min-h-screen bg-blueGray-200">
      <header className="w-full flex-none flex justify-center py-6 border-b border-black">
        <div className="container flex justify-between items-center">
          <h2 className="text-3xl">snen.dev</h2>
          <nav>
            <a href="https://github.com/snendev/website">
              <GithubIcon size={36} />
            </a>
          </nav>
        </div>
      </header>
      <main className="container flex-1 py-12">
        {children}
      </main>
    </div>
  );
}
