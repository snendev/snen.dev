/** @jsxImportSource https://esm.sh/react@rc */
import React from "https://esm.sh/react@rc"

const comments = [
  "aaaaa",
  "bbb",
  "cccccccc",
]

export default function Comments() {
  // const comments = useData();
  return (
    <>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </>
  );
}
