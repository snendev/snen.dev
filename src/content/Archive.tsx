/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";
import suspendForData from "../data/suspendForData.tsx"

interface ArchiveProps {
  url: URL
}

export default function Archive({url}: ArchiveProps) {
  const archive: number[] = suspendForData(
    "archive",
    async () => {
      const response = await fetch(`${url.origin}/api/archive`);
      return await response.json();
    }
  );
  return (
    <>
      {archive.map((i) => (
        <span>{i}</span>
      ))}
    </>
  );
}
