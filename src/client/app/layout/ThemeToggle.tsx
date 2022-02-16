/** @jsx React.createElement */
import React from "../../../deps/react.ts";

import { useTheme } from "../theme.tsx"
import cx from "../classnames.ts"

export default function ThemeToggle() {
  const { mode, toggleThemeMode } = useTheme()

  return (
    <button
      onClick={toggleThemeMode}
      className={cx("fa", "fab", mode === "light" ? "fa-sun" : "fa-moon")}
      aria-label="Visual theme toggle"
    >
    </button>
  );
}
