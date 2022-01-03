/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "react";

import useFetch from "../useFetch.tsx"

export default function Posts() {
  const response = useFetch(
    "https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts",
  );
  const stuff = response.text();
  console.log({response});
  return (
    <p>
      {stuff}
    </p>
  );
}
