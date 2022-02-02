/** @jsx React.createElement */
import React from "../../../deps/react.ts";

export default function Navbar() {
  return (
    <section>
      <a href="https://twitter.com/snendev" target="_blank">
        <div>twitter: @snendev</div>
      </a>
      <a href="https://github.com/snendev" target="_blank">
        <div>github: @snendev</div>
      </a>
      <a href="https://twitter.com/snendev" target="_blank">
        <div>email: me@snen.dev</div>
      </a>
      <a href="/feed" target="_blank">
        <div>rss: https://snen.dev/feed</div>
      </a>
    </section>
  );
}
