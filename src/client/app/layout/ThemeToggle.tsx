/** @jsx React.createElement */
import React from "../../../deps/react.ts";

import { useTheme } from "../theme.tsx"
import cx from "../classnames.ts"

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { mode, toggleThemeMode } = useTheme()

  return (
    <button
      onClick={toggleThemeMode}
      className={cx("fa", "fab", mode === "light" ? "fa-sun" : "fa-moon", className)}
      aria-label="Visual theme toggle"
    >
    </button>
  );
}
