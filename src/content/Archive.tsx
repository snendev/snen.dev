/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";
import useFetch from "../useFetch.tsx"

interface ArchiveProps {
  url: URL
}

export default function Archive({url}: ArchiveProps) {
  const response = useFetch(`${url.origin}/api/archive`);
  const archive = response.json() as number[];
  return (
    <>
      {archive.map((i) => (
        <span>{i}</span>
      ))}
    </>
  );
}
