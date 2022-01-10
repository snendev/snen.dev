/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../react.ts";

import suspendData from "../data/suspendData.ts";

interface PostsProps {
  url: URL;
}

export default function Posts({ url }: PostsProps) {
  // TODO suspend on each post, only get directory data from here
  const data = suspendData(
    "api/posts",
    async () => {
      const response = await fetch(`${url.origin}/api/posts`);
      return await response.json() as {title: number, text: string}[];
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
      {data.map(({title, text}) => (
        <>
          <h2>{title}</h2>
          <p>{text}</p>
        </>
      ))}
    </div>
  );
}
