/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import suspendData from "../data/suspendData.ts";

interface ArchivePageProps {
  url: URL;
  page: number;
}

function ArchivePage({ url, page }: ArchivePageProps) {
  const archive: number[] = suspendData(
    `api/archive/${page}`,
    async () => {
      const response = await fetch(`${url.origin}/api/archive/${page}`);
      return await response.json();
    },
  );
  return (
    <div>
      {archive.map((i) => (
        <span key={i} onClick={() => console.log(i)}>{i}</span>
      ))}
    </div>
  );
}

interface ArchiveProps {
  url: URL;
}

export default function Archive({ url }: ArchiveProps) {
  return (
    <>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={0} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={1} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={2} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={3} />
      </React.Suspense>
    </>
  );
}
