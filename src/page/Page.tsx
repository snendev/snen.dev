/** @jsx React.createElement */
import React from "react";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <main>
      <h3>React 18 on Deno Deploy - Experimental</h3>
      {children}
    </main>
  );
}
