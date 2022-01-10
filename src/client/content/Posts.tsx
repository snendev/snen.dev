/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import suspendForData from "../data/suspendForData.ts"
import { React } from "../deps.ts";

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
  );
  return (
    <p>
      {text}
    </p>
  );
}
