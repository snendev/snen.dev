/** @jsx React.createElement */
import React from "../../../deps/react.ts";
import { Link } from "../../../deps/react-router-dom.tsx"

import ThemeToggle from "./ThemeToggle.tsx"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/reading">read</Link>
      <Link to="/tech">tech</Link>
      <Link to="/media">media</Link>
      <ThemeToggle />
    </nav>
  );
}
