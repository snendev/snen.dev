/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import suspendData from "../data/suspendData.ts";

interface PostsProps {
  url: URL;
}

export default function Posts({ url }: PostsProps) {
  const text = suspendData(
    "api/posts",
    async () => {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts",
      );
      return await response.text();
    },
  );
  return (
    <p>
      {text}
    </p>
  );
}
