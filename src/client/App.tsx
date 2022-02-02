/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../deps/react.ts";

import AppRouter from "./app/AppRouter.tsx";
import { ThemeProvider } from "./theme.tsx";

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}
