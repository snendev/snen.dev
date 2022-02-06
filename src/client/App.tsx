/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../deps/react.ts";

import AppRouter from "./app/AppRouter.tsx";
import { ThemeProvider } from "./app/theme.tsx";

export default function App() {
  return (
    <ThemeProvider mode="dark">
      <AppRouter />
    </ThemeProvider>
  );
}
