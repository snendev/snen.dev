/** @jsx React.createElement */
import React from "../../react.ts";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/">home</a>
      <a href="/about">about</a>
      <a href="/read">read</a>
      <a href="/tech">tech</a>
      <a href="/media">media</a>
    </nav>
  );
}
