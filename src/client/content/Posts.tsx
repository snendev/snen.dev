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

  const [counter, setCounter] = React.useState(0);

  function onClick() {
    setCounter((prev) => prev + 1);
  }

  return (
    <div>
      <div>
        {counter}
        <button onClick={onClick}>+</button>
      </div>
      <p>
        {text}
      </p>
    </div>
  );
}
