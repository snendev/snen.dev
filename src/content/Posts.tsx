/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { React } from "../deps.ts";
import suspendForData from "../data/suspendForData.tsx"

interface PostsProps {
  url: URL
}

export default function Posts({url}: PostsProps) {
  const text = suspendForData(
    "posts",
    async () => {
      const response = await fetch("https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts");
      return await response.text()
    },
    0,
  );
  return (
    <p>
      {text}
    </p>
  );
}
