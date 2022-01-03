/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";
import useFetch from "../useFetch.tsx"

interface PostsProps {
  url: URL
}

export default function Posts({url}: PostsProps) {
  const response = useFetch(
    "https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts",
  );
  const stuff = response.text();
  return (
    <p>
      {stuff}
    </p>
  );
}
