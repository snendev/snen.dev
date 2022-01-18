/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../deps/react.ts";
import { Link } from "../../deps/react-router.ts"

export default function Error404() {
  return (
    <div>
      <p>
        We can't seem to find the page you're looking for... Sorry!
      </p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
}
