/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";
import suspendForData from "../data/suspendForData.tsx"

interface ArchivePageProps {
  url: URL
  page: number
  delay: number
}

function ArchivePage({url, page, delay}: ArchivePageProps) {
  const archive: number[] = suspendForData(
    `archive${page}`,
    async () => {
      const response = await fetch(`${url.origin}/api/archive/${page}`);
      return await response.json();
    },
    delay,
  );
  return (
    <div>
      {archive.map((i) => (
        <span key={i} onClick={() => console.log(i)}>{i}</span>
      ))}
    </div>
  )
}

interface ArchiveProps {
  url: URL
}

export default function Archive({url}: ArchiveProps) {
  return (
    <>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={0} delay={2} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={1} delay={2} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={2} delay={6} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ArchivePage url={url} page={3} delay={8} />
      </React.Suspense>
    </>
  );
}
